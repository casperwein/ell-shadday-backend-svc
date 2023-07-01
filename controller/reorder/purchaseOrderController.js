const PurchaseOrder = require("../../models/index").purchase_order
const {response, setLog, resError} = require("../../helper/response")
const generatePurchaseOrder = require("../../helper/generatePurchaseOrder")
const {dateNow} = require("../../helper/generate");
const moment = require('moment')

const AddPurchaseOrder = async(req, res, data) => {
    const po = Math.floor(100000 + Math.random() * 999999)
    const now = dateNow()
    const timeNow = moment(now, 'YYYYMMDDHHmm').format('DD-MM-YYYY');

    const data_purchase_order = {
        number: po,
        date: timeNow,
        status: data.status,
        items: [
            { kodebahan: data.kodebahan, warna : data.warna, quantity: data.quantity }
        ],
        supplier: data.supplier
    };

    await PurchaseOrder.create({
        po,
        id_rop: data.id,
        json_data: JSON.stringify(data_purchase_order),
    }).then(s => {
        generatePurchaseOrder(data_purchase_order)
        setLog("success", s)
    }).catch(error => {
        console.log(error)
        setLog("error insert data pembelian", error)
    })
}

module.exports = {
    AddPurchaseOrder
}
