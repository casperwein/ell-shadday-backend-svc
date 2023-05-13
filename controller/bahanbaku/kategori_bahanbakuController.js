const Kategori = require("../../models/index").kategori_bahanbaku
const {response, setLog, resError} = require("../../helper/response")


const GetAllKategori = async(req, res) => {
    await Kategori.findAll().then(kategori => {
        response(200, "SUCCESS", kategori, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const AddKategori = async(req, res) => {
    const {nama, keterangan} = req.body

    await Kategori.create({nama, keterangan}).then(kategori => {
        response(200, "SUCCESS", kategori, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const DeleteKategori = async(req, res) => {
    const id = req.params.id

    await Kategori.destroy({where: {id}})
    .then(response(200, "SUCCESS", [], res))
    .catch(error => console.log(error))
}


module.exports = {
    GetAllKategori,
    AddKategori,
    DeleteKategori
}