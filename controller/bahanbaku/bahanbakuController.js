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
    const nama = req.body.nama
    const satuan = req.body.satuan
    let {suplierId, warna, kodebahan, baku_desc, tanggal_terima, tempat_penyimpanan, type_bahan, roll_ball,
    quantity, yard, kg, is_return, jumlah_return, yard_return, kg_return, penerima, kurir, note, faktur, list} = req.body
 
    console.log(req.body.list)

    type_bahan == 'Kg' ? (kg = yard, yard = 0) : (kg = 0)
    is_return != "Y" ? (is_return = 'N', yard_return = 0, kg_return = 0, jumlah_return = 0) : (yard_return, kg_return)
    const image = gambar.replace(/\\/g, '/'); // ganti nama gambar

    // const date = new Date(tanggal_terima); // ubah format tanggal terima
    // const formattedDate = date.toLocaleDateString();

    // issue add new bahan baku dari depan gak bisa masuk karena masalah LIST byard bahan baku perlu di enghance


    if(!req.file){
         return resError(422, "Gambar Belum upload!", error, res)
    }

    await Bahan.findOne({where: {kodebahan: kodebahan}}).then(bahan => {
        if(!bahan){
            const payload = {
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
        suplierId, warna, kodebahan, baku_desc, tanggal_terima, tempat_penyimpanan, type_bahan, roll_ball,
        quantity, yard, kg, is_return, jumlah_return, yard_return, kg_return, penerima, kurir, note, faktur, list, picture: image
    }).then(data_baku => {
        Bahan.findOne({where: {kodebahan: kodebahan}}).then(bahan => {

            const listBahan = list.split(",").map(ls => parseFloat(ls))
            const jumlah_unit = listBahan.length
            const total = listBahan.reduce((acc, sum) => acc + sum, 0)

            if (bahan.satuan === 'yard') {
                bahan.jumlah_unit = bahan.jumlah_unit + jumlah_unit
                bahan.yard_kg_clean = bahan.yard_kg_clean + total
                bahan.total_yard_kg = bahan.total_yard_kg + total
                bahan.save()
            } else {
                bahan.jumlah_unit = bahan.jumlah_unit + jumlah_unit
                bahan.yard_kg_clean = bahan.yard_kg_clean + total
                bahan.total_yard_kg = bahan.total_yard_kg + total
                bahan.save()  
            }
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
