const Suplier = require("../../models/index").suplier
const {response, resError} = require("../../helper/response")
const msgISE = "INTERNAL SERVER ERROR"

const GetSuplierData = async(req, res) => {
    await Suplier.findAll().then(sup => {
        response(200, "SUCCES", sup, res)
    }).catch(error => {
        resError(500, msgISE, error, res)
    })
}

const AddSuplier = async(req, res) => {
    let id = Math.floor(1000 + Math.random() * 9999)
    
    const {nama, email, telepon, alamat} = req.body
    
    await Suplier.create({id, nama, email, telepon, alamat})
        .then(result => {
            return response(200, "SUCCESS", result, res)
        }).catch(error => {
            console.log(error)
            return resError(500, msgISE, error, res)
        })
}

const UpdateSuplier = async(req, res) => {
    const id = req.params.id
    const data =  {nama, email, telepon} = req.body.suplier

    await Suplier.update(data, {where: {id}}).then(data_suplier => {
        return response(200, "UPDATE SUCCESS", data_suplier, res)
    }).catch(error => {
        console.log(error)
        return resError(500, msgISE, error, res)
    })
}

const DeleteSuplier = async(req, res) => {
    const id = req.params.id
    await Suplier.destroy({where: {id}}).then(()=> {
        return response(200, "DELETED SUCCESS", [], res)
    }).catch(error => {
        return resError(500, msgISE, error, res)
    })
}

module.exports = {
    GetSuplierData,
    AddSuplier,
    UpdateSuplier,
    DeleteSuplier
}