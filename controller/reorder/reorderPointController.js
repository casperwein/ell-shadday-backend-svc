const ReorderPoint = require("../../models/index").reorder_point_log
const {response, setLog, resError} = require("../../helper/response")
const {AutoAddNewPembelian} = require("./pembelianController")
const {Op} = require("sequelize")

const AddReorderPoint = async(data) => {
    let status = "Wait For"
    const tanggal_reorder_point = new Date()
    let msg
    await ReorderPoint.create({
        kodebahan: data.kodebahan,
        quantity :data.newQuantity,
        warna: data.warna,
        status, tanggal_reorder_point
    }).then(bahan => {
        msg = `Alert: Bahan dengan kode ${data.kodebahan} tersisa ${data.newQuantity}. Bahan masuk dalam list Reorder!`
        setLog(msg, bahan)
    }).catch();
}

const UpdateStatusApproveReorder = async(req, res) => {
    const id = req.params.id
    const {statusNow, quantity} = req.body.status

    console.log(statusNow + " " + quantity)

    await ReorderPoint.findOne({where: {id}}).then(data => {
        data.status = statusNow;
        data.quantity = quantity;
        data.save()
        if(statusNow == "Approve") {
            AutoAddNewPembelian(req, res, data)
        }
        response(200, "Update Status Approve SUCCESS", data, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

//**hit db secara berkala */
const GetDataBerkala = async(req, res) => {
    await ReorderPoint.findAll({where: {status: "Wait For"}}).then(order => {
        if(order.length != 0) {
            const now = new Date()
            const msg = `${now} Alert: Terdapat ${order.length} bahan baku dengan status "Wait For" pada list reorder!`
            console.log(msg)
            setLog("INFO", msg)
            // response(200, "SUCCESS", msg, res) //* belum bisa ngirim ke respons. error
        }
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

// ** hit db secara berkala
setInterval(() => {
    GetDataBerkala();
  }, 240 * 60 * 1000); //*set ke 240 --> setial 4 jam

const GetAllReorder = async(req, res) => {
    await ReorderPoint.findAll({where: 
        {status:{
            [Op.or]: ["Wait For", 'Rejected', 'Processing']
        }}
    }).then(order => {
        response(201, "SUCCES", order, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}


const GetReorderByKodebahan = async(req, res) => {
    const kodebahan = req.params.kodebahan

    await ReorderPoint.findOne({where:{kodebahan}}).then(r => {
        response(200, "get data succesfully", r, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

module.exports = {
    AddReorderPoint,
    GetAllReorder,
    UpdateStatusApproveReorder,
    GetDataBerkala,
    GetReorderByKodebahan
}