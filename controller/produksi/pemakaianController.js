const Pemakaian = require("../../models/index").pemakaian
const Bahan = require("../../models/index").bahan
const Produk = require("../../models/index").produk
const BahanSisa = require("../../models/index").bahansisa

const {response, setLog, resError} = require("../../helper/response")
const {dateNow} = require("../../helper/generate")
const {AddReorderPoint} = require("../reorder/reorderPointController")
const {Op} = require("sequelize");


const AddPemakaianBarang = async(req, res) => {
    let {
        po_produk, kodebahan, cutterId, 
        panjang_berat, jumlah_gambar, jumlah_lembar, yard_kg, tanggal_pemakaian, ukuran
    } = req.body

    const jenis = po_produk
    const gen_id = dateNow()
    const id = jenis + "_" + gen_id
    
    let total_yard_kg, yard_kg_pemakaian, jumlah_roll_ball,
        total_potongan_pakaian, lusin, sisa_flag, total_yard_kg_sisa

        const list = yard_kg.split(",").map(ls => parseFloat(ls))
        total_yard_kg = list.reduce((acc, sum) => acc + sum, 0)
        jumlah_roll_ball = list.length
        yard_kg_pemakaian = ((jumlah_lembar * panjang_berat) / 90).toFixed(2)
        total_potongan_pakaian = jumlah_gambar * jumlah_lembar

        // menentukan lusinan
        const lsn = Math.floor(total_potongan_pakaian / 12);
        const bg = total_potongan_pakaian % 12
        lusin = parseFloat(lsn + '.' + bg);

        // menghitung sisaan       
        //TODO: bisa dipikirkan lagi untuk perhitungan sisa bahan kaos
        const sisa = (total_yard_kg - yard_kg_pemakaian).toFixed(2)
        if (sisa > 1 ){
            sisa_flag = "Y"
            total_yard_kg_sisa = sisa
        } else {
            sisa_flag = "N"
            total_yard_kg_sisa = 0
        }

    await Pemakaian.create({
        id, po_produk, kodebahan, cutterId, 
        panjang_berat, jumlah_gambar, jumlah_lembar, yard_kg, tanggal_pemakaian,
        total_yard_kg, yard_kg_pemakaian, jumlah_roll_ball, ukuran,
        total_potongan_pakaian, lusin, sisa_flag, total_yard_kg_sisa   
    }).then(pemakaian => {
        // update data bahan baku
        Bahan.findOne({where: {kodebahan}}).then(bahan => {
            bahan.total = bahan.total - yard_kg_pemakaian
            bahan.jumlah_unit = bahan.jumlah_unit - jumlah_roll_ball
            bahan.yard_kg_clean = bahan.yard_kg_clean - yard_kg_pemakaian
            bahan.yard_kg_sisa = bahan.yard_kg_sisa + parseFloat(total_yard_kg_sisa)

             // set 0 jika hasil pengurangan unit dan yard/kg < 0
            if (bahan.jumlah_unit < 0 && bahan.total < 0) {
                bahan.jumlah_unit = 0
                bahan.total = 0
             }
            
            bahan.save()
            
            const warna = bahan.dataValues.warna
            const newQuantity = bahan.jumlah_unit
            const safetyStock = 10

            // reorder point
            if (newQuantity <= safetyStock) {
                const data = {
                    kodebahan, newQuantity, warna: bahan.warna
                }
                AddReorderPoint(data)   
            }
            
        // insert to bahan sisa if sisa flag = Y
            if(sisa_flag === "Y"){
                const gen_id = "SISA_" + id + "_" + Math.floor(1 + Math.random() * 100)
                BahanSisa.create({
                    id: gen_id, kodebahan, kodepemakaian:id, warna:warna, tanggal_pemakaian, cutter_id: cutterId,  
                    yard_kg_sisa: total_yard_kg_sisa
                }).then(

                ).catch(error=> console.log(error))
            }
        })        

        // input jumlah lusin di produk
        Produk.findOne({where: {po: po_produk}}).then(produk => {
            produk.entity = produk.entity + lusin
            produk.save();
        })
        response(201, "SUCCESS", pemakaian, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const GetAllDataPemakaian = async(req, res) => {
    await Pemakaian.findAll().then(data => {
        response(200, "SUCCESS", data, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const GetPemakaianBahanByIDPemakaian = async(req, res) => {
    const id = req.params.id
    await Pemakaian.findOne({where: {id}}).then(data => {
        response(200, "SUCCESS", data, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const EditPemakaian = async(req, res) => {
    const id = req.params.id

    const data = { po_produk, kodebahan, cutterId, 
        panjang_berat, jumlah_gambar, jumlah_lembar, yard_kg, ukuran} = req.body

    await Pemakaian.update(data, {where: {id}, returning:true}).then(d => {
        response(200, "SUCCESS", d, res)
    }).catch(e => {
        console.log(e)
        resError(500, process.env.ISE, e, res)
    })
}

const GetPemakaianByPOProduksi = async(req, res) => {
    const po_produk = req.params.po_produk

    await Pemakaian.findAll({where:{po_produk}}).then(p => {
        response(200, "SUCCESS", p, res)
    }).catch(e => {
        console.log(e)
        resError(500, process.env.ISE, e, res)
    })
}

const GetDataWithFilter = async (req, res) => {
    // const data = {startDate, endDate, kategori } = req.query
    let {scanTime,startDate, endDate, kodebahan, po_produk } = req.query
    scanTime =='AllTime' ? scanTime = '' : scanTime = scanTime

    const data = {
        scanTime, startDate, endDate, kodebahan
    }
    let whereCondition = {};

    if (kodebahan && scanTime && po_produk) {
        whereCondition.kodebahan = kodebahan;
        whereCondition.po_produk = po_produk;
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }
    if (kodebahan && po_produk) {
        whereCondition.kodebahan = kodebahan;
        whereCondition.po_produk = po_produk;
    }

    if (po_produk && scanTime ) {
        whereCondition.po_produk = po_produk;
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }

    if (kodebahan && scanTime ) {
        whereCondition.kodebahan = kodebahan;
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }
    if (po_produk) {
        whereCondition.po_produk = po_produk;
    }

    if (kodebahan) {
        whereCondition.kodebahan = kodebahan;
    }
    if (scanTime) {
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }
    console.log(whereCondition)

    await Pemakaian.findAll({where: whereCondition}).then(bhn => {
        response(200, "SUCCESS", bhn, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}


module.exports = {
    AddPemakaianBarang,
    GetAllDataPemakaian,
    GetPemakaianBahanByIDPemakaian,
    EditPemakaian,
    GetPemakaianByPOProduksi,
    GetDataWithFilter
}