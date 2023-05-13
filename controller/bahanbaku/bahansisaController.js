const BahanSisa = require("../../models/index").bahansisa
const {response, resError} = require("../../helper/response")


function genereateId(){
    const genid = "SISA" 
    let id = '';
    for (let i = 0; i < 5; i++) {
        id += Math.floor(Math.random() * 10);
    }
    console.log(id)
}


const GetAllBahanSisa = async(req,res) => {
    await BahanSisa.findAll().then(bahansisa => {
        response(200, "SUCCESS", 2, res)
    }).catch(error => {
        resError(500, process.env.ISE, error, res)
    })
}

module.exports ={
    GetAllBahanSisa
}