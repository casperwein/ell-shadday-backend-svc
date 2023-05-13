const Bahan = require("../../models/index").bahan
const Pemakaian = require("../../models/index").pemakaian

const {response, resError} = require("../../helper/response")
const { sequelize } = require("../../models/index")


const GetBahan = async(req, res) => {
    await Bahan.findAll().then(bahan => {
        response(200, "SUCCESS", bahan, res)
    }).catch(error => {
        resError(500, process.env.ISE, error, res)
    })
}

const ListPemakaian = async(req, res) => {
    const kodebahan = req.params.kodebahan

    //! original: error: missing FROM-clause entry for table "Pemakaian"
    //! masih error ketika implementasi tabel dibawah ini.
    await Bahan.findAll({
        where: {kodebahan},
        include: [{
            duplicating: false,
            model: Pemakaian,
            as: "bahan_pemakaian", 
            attributes: ["id", "po_produk", "tanggal_pemakaian"],
            on: {
                "$Bahan.kodebahan$": sequelize.col("Pemakaian.kodebahan")
            },
        }]
    }).then(pemakaian => {
        response(200, "SUCCESS", pemakaian, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const AddBahan = async(data)=> {
    const kodebahan = data.kodebahan
    const nama = data.nama
    const warna = data.warna
    const gambar = data.gambar
    const satuan = data.satuan
    // console.log('INI DATA ADD BAHAN ' + warna)
    // console.log("inilah datanya: " + kodebahan + " " + nama + " " + warna+ " "  + gambar+ " "  + satuan)

    await Bahan.create({
        kodebahan, nama, warna, gambar, satuan,
        jumlah_unit: 0,
        total_yard_kg : 0.0,
        yard_kg_clean : 0.0,
        yard_kg_sisa : 0.0
    }).then().catch()
}

const GetBahanByKodebahan = async (req, res)=> {
    const kodebahan = req.params.kodebahan
    console.log(kodebahan)
    
    await Bahan.findAll({where:{kodebahan}}).then(data => {
        response(200, "SUCCESS", data, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })

}

module.exports = { 
    GetBahan,
    AddBahan,
    ListPemakaian, 
    GetBahanByKodebahan
}