'use strict';
const Baku = require("../../models/index").bahanbaku
const Bahan = require("../../models/index").bahan
const {response, resError} = require("../../helper/response")
const {AddBahan} = require("./bahanController")
const multer = require("multer")


const GetAllBahanBaku = async(req, res) => {
    await Baku.findAll().then(baku => {
        response(200, "SUCCESS", baku, res)
    }).catch(error => {
        resError(500, process.env.ISE, error, res)
    })
}
// multer upload    


const AddBahanBaku = async(req, res) => {
    const gambar = req.file.path
    let {suplierId, warna, kodebahan, bahan_bahu_desc, tanggal_terima, tempat_penyimpanan, roll_ball_quantity,
        kg_yard_meter_quantity, is_return, roll_ball_return, yard_kg_meter_return, penerima, kurir, note, faktur, 
        nama, list, list_return, satuan, ukuran, kategori} = req.body

    const image = gambar.replace(/\\/g, '/'); // ganti nama gambar

    is_return != "Y" ? (is_return = 'N', roll_ball_return = 0, yard_kg_meter_return = 0, list_return = 0) : (roll_ball_return, yard_kg_meter_return, list_return)

    await Bahan.findOne({where: {kodebahan: kodebahan}}).then(bahan => {
        if(!bahan){
            const payload = {
                ukuran, kategori, satuan,
                kodebahan: kodebahan, 
                nama,
                warna: warna, 
                gambar:image,
                satuan
            }
            AddBahan(payload)  
        }
    }).catch(error => console.log(error))

    await Baku.create({
        suplierId, warna, kodebahan, bahan_bahu_desc, tanggal_terima, tempat_penyimpanan, roll_ball_quantity,
        kg_yard_meter_quantity, is_return, roll_ball_return, yard_kg_meter_return, penerima, kurir, note, faktur, 
        list, list_return, gambar: image
    }).then(data_baku => {
        Bahan.findOne({where: {kodebahan: kodebahan}}).then(bahan => {
            const listBahan = list.split(",").map(ls => parseFloat(ls))
            const jumlah_unit = listBahan.length
            const total = listBahan.reduce((acc, sum) => acc + sum, 0)
            
            // save data to bahan
            bahan.roll_ball_quantity = bahan.roll_ball_quantity + jumlah_unit
            bahan.yard_kg_clean = bahan.yard_kg_clean + total
            bahan.total_yard_kg = bahan.total_yard_kg + total
            bahan.save()

        }).catch(error => {
            // resError(500, process.env.ISE, error, res)
            console.log(error)
        })
        response(200, "SUCCESS", data_baku, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}


const FindBahanBakuByID = async(req, res) => {
    const kodebahan = req.params.kodebahan

    await Baku.findAll({where: {kodebahan}}).then(baku => {
        response(200, "SUCCESS", baku, res)
    }).catch(error => {
        resError(500, process.env.ISE, error, res)
    })
}

module.exports = {
    GetAllBahanBaku,
    AddBahanBaku,
    FindBahanBakuByID
}
