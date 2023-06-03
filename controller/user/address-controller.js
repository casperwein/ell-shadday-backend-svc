const Address = require("../../models/index").address
const {response, resError, invalidRequestRespon} = require("../../helper/response")
const errISE = "INTERNAL SERVER ERROR"

const getDataAddress = async (req, res) => {
    await Address.findAll().then(address => {
        return response(200, "SUCCESS", address, res)
    }).catch(error => {
        return resError(500, errISE, error, res)
    })
}


const addUserAddress = async (req, res) => {
    const userID = req.id;
    const jalan = req.body.address.jalan;
    const no_rumah = req.body.address.no_rumah;
    const rt_rw = req.body.address.rt_rw;
    const kelurahan = req.body.address.keluarahan;
    const kecamatan = req.body.address.kecamatan;
    const kota = req.body.address.kota;
    const provinsi = req.body.address.provinsi;
    const negara = req.body.address.negara;

    await Address.create({
        userID, jalan, no_rumah, rt_rw, kelurahan, kecamatan,
        kota, provinsi, negara
    }).then((userAddress) => {
        console.log(userAddress)
        return response(201, "Insert Succes", userAddress, res)
    }).catch(error => {
        console.log(error)
        return resError(500, errISE, error, res)
    })
}

const updateAddress = async(req, res) => {
    const id = req.params.id
    const data =  { jalan, no_rumah, rt_rw, kelurahan, kecamatan,  kota,  provinsi, negara} = req.body.address

    await Address.update(data, {where: {id}, returning:true}).then(address => {
        response(200, "Update Success", address, res)
    }).catch(error => {
        console.log(error)
        return resError(500, errISE, error, res)
    })
}

const deleteAddress = async(req,res) => {
    const id = req.params.id
    
    await Address.destroy({where: {id}}).then(()=> {
        response(200, "Deleted Success", [], res)
    }).catch(error => {
        console.log(error)
        return resError(500, errISE, error, res)
    })
}

const GetDataAddressByUserID = async(req, res) => {
    const userID = req.params.userID

    await Address.findOne({where: {userID}}).then(data => {
        response(200, "Success", data, res)
    }).catch(error => {
        console.log(error)
        return resError(500, errISE, error, res)
    })
}

module.exports = {
    addUserAddress,
    getDataAddress,
    updateAddress, 
    deleteAddress,
    GetDataAddressByUserID
}
