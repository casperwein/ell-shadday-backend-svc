const PO = require("../../models/index").purchase_order
const {response, resError} = require("../../helper/response")

const GetDataPurchaseOrder = async (req,res) => {
    await PO.findAll({
        order: [['createdAt', 'DESC']]
    }).then(data => {
        response(200, "SUCCESS", data, res)
    }).catch(error => {
        resError(500, process.env.ISE, error, res)
    })
}

module.exports = {
    GetDataPurchaseOrder
}