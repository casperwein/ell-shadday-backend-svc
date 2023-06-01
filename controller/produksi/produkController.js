const Produk = require("../../models/index").produk
const {response, resError} = require("../../helper/response")


const AddProduk = async(req, res) => {
    const gambar = req.file.path
    const {
        po, nama_produk, kodebahan, attributes, cutter_id, cmt_id, entity,
        proggress, tanggal_produksi
    } = req.body

    await Produk.create({
        po, nama_produk, kodebahan, attributes, cutter_id, cmt_id, entity,
        proggress, tanggal_produksi, gambar
    }).then(produk => {
        response(200, "SUCCESS", produk, res)
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

const GetProdukById = async(req, res) => {
    const po = req.params.po
    await Produk.findOne({where: {po}}).then(produk => {
        response(200, "SUCCESS", produk, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

module.exports = {
    AddProduk,
    GetAllProduk,
    GetProdukById
} 