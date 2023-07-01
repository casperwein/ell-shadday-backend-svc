const express = require('express')
const cors = require('cors')
const multer = require('multer');
const path = require('path');


const userRouter = require("./router/users/userRouter")
const addressRouter = require("./router/users/addressRouter")
const userBankAcc = require("./router/users/bank_accRouter")

const bahan = require("./router/bahanbaku/bahanRouter")
const bahanBaku = require("./router/bahanbaku/bahanbakuRouter")
const bahanbakuSuplier = require("./router/bahanbaku/suplierRouter")
const bahansisa = require("./router/bahanbaku/bahansisaRouter")

const kategori = require("./router/bahanbaku/kategoriRouter")

const produk = require("./router/produk/produkRouter")
const pemakaian = require("./router/produk/pemakaianRouter")

const reorder = require("./router/reorder/reorderRouter")
const otherSvc = require("./router/others/dataForDashboardRouter")


const app = express()
const port = process.env.PORT 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + '_' + file.originalname)
    }
  });

const filterGambar = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/users", userRouter)
app.use("/users-address", addressRouter)
app.use("/users-bank-account", userBankAcc)

app.use('/public/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(multer({storage: storage, fileFilter: filterGambar}).single('gambar'))
app.use("/bahan", bahan)
app.use("/bahan-baku", bahanBaku)
app.use("/bahan-baku-suplier", bahanbakuSuplier)


app.use("/kategori", kategori)

app.use("/produk", produk)
app.use("/pemakaian", pemakaian)
app.use("/bahan-sisa", bahansisa)

app.use("/rop", reorder)

app.use("/other-svc", otherSvc)

app.listen(port, () => console.log(`ell-shadday-app:${port}`))