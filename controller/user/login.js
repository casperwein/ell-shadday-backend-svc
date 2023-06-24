const User = require("../../models/index").user
const { comparePassword } = require("../../helper/bcrypt")
const { generateToken } = require("../../helper/authentication");
const {response, resError, invalidRequestRespon} = require("../../helper/response")

const msgISE = "INTERNAL SERVER ERROR"

const Login = async(req, res) => {
    const { email,  password } = req.body

    await User.findOne({ where: { email } }).then(user => {
        if (!user) {
            const msg = "Email tidak terdaftar!"
            const status = "user not available"
            return invalidRequestRespon(401, msg, status, res )
        }

        const passwordValid = comparePassword(password, user.password)
        if (!passwordValid){
            const msg = "Password salah!"
            return invalidRequestRespon(401, msg, null, res)
        }

        const data = {
            id: user.id,
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            gender: user.gender,
            role: user.role,
            phone_number: user.phone_number,
            gambar: user.gambar,
            status: user.status
        }

        const token = generateToken(data)
        const msg = "Login Success"
        const sendData = {
            token,
            status: "sukses",
            scantimestamp: new Date()
        }
        return response(200, msg, sendData, res )
    }).catch(error => {
        return resError(500, msgISE, error, res )
    })
}


module.exports = Login