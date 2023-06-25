const Pembelian = require("../../models/index").pembelian
const {response, setLog, resError} = require("../../helper/response")
const generatePurchaseOrder = require("../../helper/generatePurchaseOrder")

const AutoAddNewPembelian = async(req, res, data) => {
    const po_pembelian = Math.floor(100000 + Math.random() * 999999)

    await Pembelian.create({
        po_pembelian,
        kodebahan: data.kodebahan,
        id_reorder: data.id,
        quantity: data.quantity,
        warna: data.warna
    }).then(data => {
        setLog("success", data)
    }).catch(error => {
        console.log(error)
        setLog("error insert data pembelian", error)
    })
}

module.exports = {
    AutoAddNewPembelian
}
