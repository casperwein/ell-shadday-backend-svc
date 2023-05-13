const Produk = require("../../models/index").produk
const {response, resError} = require("../../helper/response")


const AddProduk = async(req, res) => {
    const data = {
        po, nama_produk, kodebahan, attributes, cutter_id, cmt_id, entity,
        proggress, gambar, tanggal_produksi
    } = req.body.produk

    await Produk.create(data).then(produk => {
        response(201, "SUCCESS", produk, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const GetAllProduk = async(req, res) => {
    await Produk.findAll().then(produk => {
        response(200, "SUCCESS", produk, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

module.exports = {
    AddProduk,
    GetAllProduk
} 