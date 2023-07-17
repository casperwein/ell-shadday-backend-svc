const Produk = require("../../models/index").produk
const {response, resError} = require("../../helper/response")
const {Op} = require("sequelize");
const {bahan: Bahan} = require("../../models");


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

const GetDataWithFilter = async (req, res) => {
    let {scanTime,startDate, endDate, status } = req.query

    const data = {
        scanTime, startDate, endDate, status
    }
    let whereCondition = {};

    if (status) {
        whereCondition.proggress = status;
    }
    if (scanTime) {
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }
    if (status && scanTime ) {
        whereCondition.proggress = status;
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }

    await Produk.findAll({where: whereCondition}).then(pr => {
        console.log(pr)
        response(200, "SUCCESS", pr, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const UpdateProduk = async (req, res) => {
    const gambar = req.file
    const po = req.params.po
    let {
        nama_produk, kodebahan, attributes, cutter_id, cmt_id,
        proggress
    } = req.body

    const data = {
        nama_produk, kodebahan, attributes, cutter_id, cmt_id,
        proggress, gambar
    }

    await Produk.findOne({where: {po}}).then(dt => {
        for (const field in data) {
            if (data[field] !== "") {
                dt[field] = data[field];
            }
        }
        dt.save()
        response(200, "UPDATE SUCCESS", [], res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}


module.exports = {
    AddProduk,
    GetAllProduk,
    GetProdukById,
    GetDataWithFilter,
    UpdateProduk
} 