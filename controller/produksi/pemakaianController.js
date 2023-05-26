const Pemakaian = require("../../models/index").pemakaian
const Bahan = require("../../models/index").bahan
const Produk = require("../../models/index").produk
const BahanSisa = require("../../models/index").bahansisa

const {response, setLog, resError} = require("../../helper/response")
const {dateNow} = require("../../helper/generate")
const {AddReorderPoint} = require("../reorder/reorderPointController")


const AddPemakaianBarang = async(req, res) => {
    let {
        po_produk, kodebahan, cutterId, 
        panjang_berat, jumlah_gambar, jumlah_lembar, yard_kg, tanggal_pemakaian, ukuran
    } = req.body.pemakaian

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
        total_potongan_pakaian, lusin, sisa_flag,   
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


module.exports = {
    AddPemakaianBarang,
    GetAllDataPemakaian,
    GetPemakaianBahanByIDPemakaian
}