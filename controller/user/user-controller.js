const User = require("../../models/index").user
const Address = require("../../models/index").address
const BankAcc = require("../../models/index").bank_account
const { hashPassword, comparePassword } = require("../../helper/bcrypt")
const {response, resError, invalidRequestRespon} = require("../../helper/response")

const GetMyData = async(req, res) => {
    const id = req.id

    await User.findOne({
        where: {id},
        include: [
            {
                model: BankAcc,
                as: "bank",
                attributes: ["owner_name", "bank_name", "bank_code", "no_rek"],
            },
            {
                model: Address,
                as: "address",
                attributes: ["userID", "jalan", "no_rumah", "rt_rw", "kelurahan", "kecamatan", "kota", "provinsi", "negara"]
            }
        ]
    }).then(myData => {
        return response(200, "SUCCESS", myData, res)
    }).catch(error => {
        console.log(error)
        return resError(500, process.env.ISE, error, res)
    }) 
}


const GetUserByID = async(req, res) => {
    const id = req.params.id

    await User.findOne({where: {id}}).then(data_user => {
        response(200, "get data succesfully", data_user, res)
    }).catch(error => {
        console.log(error)
        return resError(500, process.env.ISE, error, res)
    })
}

const GetAllUser = async(req, res) => {
    await User.findAll().then(user => {
        const len = user.length;
        let  userID,
        full_name, email, username, place_dob,
        data, dob, role, gender, phone_number, gambar,status

        const data_user = new Array();

        for(let i = 0; i < len; i++) {
            userID = user[i].id
            full_name  = user[i].full_name
            email = user[i].email
            username = user[i].username
            place_dob = user[i].place_dob
            dob = user[i].dob
            role = user[i].role
            gender = user[i].gender
            phone_number = user[i].phone_number
            gambar = user[i].gambar
            status = user[i].status
            data = {
                userID,
                full_name, email, username, place_dob,
                dob, role, gender, phone_number, gambar,status
            }
            data_user.push(data)
        }
        return response(200, "get data successfully", data_user, res)
    }).catch (error => {
        console.log(error)
        return resError(500, process.env.ISE, error, res)
    })
}

const Register = async(req, res) => {
    let id = Math.floor(10000 + Math.random() * 99999)
    const { 
        full_name, email, password, username, place_dob,
        dob, role, gender, phone_number} = req.body;

    const hash = hashPassword(password)

    await User.findOne({ where: { email, username } }).then(user => {
        const msg =  "email atau username telah terdaftar"
        if (user) {
            return response(409, msg, null, res) 
        }

        User.create({
            id,
            full_name, email, password: hash, username, place_dob,
            dob, role, gender, phone_number
        }).then(() => {
            const data = {
                user: {
                    id,
                    full_name, email, username, place_dob,
                    dob, role, gender, phone_number,
                }
            } 
            console.log(data)         
            // res.status
            return response(409, "success", data.user, res) 
        }).catch(error => {
            console.log(error)
            return resError(500, process.env.ISE, error, res)
        })
    }).catch(error => {
        return resError(500, process.env.ISE, error, res)
    })
}

const UserUpdate = async(req, res) => {
    
    //* ID ambil dari token
    const userID = req.id 
    console.log(userID)

    const data =  { 
        full_name, email, username, place_dob,
        dob, role, gender, phone_number} = req.body;
        console.log(data)
    await User.update(data, {where: {userID}, returning: true}).then(user => {
        return response(200, "Data has been Updated", user[1], res)
    }).catch(error => {
        console.log(error)
        return resError(500, process.env.ISE, error, res )
    })
}


const UpdatePassword = async(req, res) => {
    let { password, password_baru, password_baru_konfirmasi } = req.body
    const username = req.username

    await User.findOne({ where: { username } }).then(user => {
        const passwordValid = comparePassword(password, user.password)
        if (!passwordValid) {
            return invalidRequestRespon(401, "password wrong", [], res)
        }
        if (password_baru != password_baru_konfirmasi) {
            return invalidRequestRespon(401, "new password not match", [], res)
        } else {
            const hash = hashPassword(password_baru_konfirmasi)
            User.update({ password: hash }, { where: { username } }).then(() => {
                return response(201, "password has updated", [], res)
            })
        }
    }).catch(error => {
        return resError(500, process.env.ISE, error, res )
    })
}

const DeleteUser = async(req, res) => {
    const userID = req.params.id

    await User.destroy({ where: { userID } }).then(() => {
        return response(200, "user has been deleted", [], res)
    }).catch(error => {
        return resError(500, process.env.ISE, error, res)
    })
}

module.exports = {
    GetMyData,
    Register,
    UpdatePassword,
    GetAllUser,
    DeleteUser,
    UserUpdate,
    GetUserByID
}