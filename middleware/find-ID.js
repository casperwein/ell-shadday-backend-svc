const {user: User, tukangpotong: Tukangpotong, bahanbaku: BahanBaku } = require("../models/index")
const {invalidRequestRespon, resError} = require("../helper/response")
const msgISE = "internal server error"


const FindIDUser = async(req, res, next) => {
    const userID = req.params.id
    await User.findOne({ where: { userID } }).then(tp => {
        if (!tp) {
            return invalidRequestRespon(400, "id not found", [], res)
        } else {
            console.log("id ditemukan")
            next()
        }
    }).catch(error => {
        resError(500, msgISE, error, res)
    })
}

const FindKodeBahan = async(req, res, next) => {
    const kodebahan = req.params.kodebahan

    await BahanBaku.findOne({ where: { kodebahan } }).then((bhn) => {
        if(!bhn){
            const msg = `Kode Bahan with id ${kodebahan}  not found`
            invalidRequestRespon(400, msg, [], res)
        }  else {
            next()
        }
    }).catch(error => {
        console.log(error)
        resError(500, msgISE, error, res)
    })
}


module.exports = {
    FindIDUser,
    FindKodeBahan,
}