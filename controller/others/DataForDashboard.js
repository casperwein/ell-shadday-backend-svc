const Bahan = require("../../models/index").bahan
const User = require("../../models/index").user
const Produk = require("../../models/index").produk
const PembelianBahanBaku = require("../../models/index").bahanbaku
const ROP = require("../../models/index").reorder_point_log
const {response, resError} = require("../../helper/response")

const GetDataForDashboard = async (req, res) => {
    let totalProduk, totalBahan, totalPembelian, totalUser
    let totalRejected, totalSuspend, totalROP, totalWaitFor, totalApproved, totalRevisi

    try {
        totalBahan = await Bahan.count()
        totalUser = await User.count()
        totalProduk = await Produk.count()
        totalPembelian = await PembelianBahanBaku.count()
        totalRejected = await ROP.count({where: {status: "Rejected"}})
        totalSuspend = await ROP.count({where: {status: "Suspend"}})
        totalWaitFor = await ROP.count({where: {status: "Wait For"}})
        totalROP = await ROP.count({where: {status: "Rop"}})
        totalApproved = await ROP.count({where: {status: "Approved"}})
        totalRevisi = await ROP.count({where: {status: "Revisi"}})
    } catch (error) {
        resError(500, process.env.ISE, error, res)
    }

    const data = {
        totalProduk, totalBahan, totalPembelian, totalUser, totalApproved,
        totalRejected, totalRevisi, totalSuspend, totalROP, totalWaitFor
    }
    response(200, "SUCCESS", data, res)
}

module.exports = {
    GetDataForDashboard
}
