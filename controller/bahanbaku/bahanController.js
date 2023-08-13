const Bahan = require("../../models/index").bahan
const Pemakaian = require("../../models/index").pemakaian
const {Op} = require('sequelize')
const {response, resError} = require("../../helper/response")
const { sequelize } = require("../../models/index")
const moment = require('moment')

const GetBahan = async(req, res) => {
    await Bahan.findAll().then(bahan => {
        response(200, "SUCCESS", bahan, res)
    }).catch(error => {
        resError(500, process.env.ISE, error, res)
    })
}

const ListPemakaian = async(req, res) => {
    const kodebahan = req.params.kodebahan

    //! original: error: missing FROM-clause entry for table "Pemakaian"
    //! masih error ketika implementasi tabel dibawah ini.
    await Bahan.findAll({
        where: {kodebahan},
        include: [{
            duplicating: false,
            model: Pemakaian,
            as: "bahan_pemakaian", 
            attributes: ["id", "po_produk", "tanggal_pemakaian"],
            on: {
                "$Bahan.kodebahan$": sequelize.col("Pemakaian.kodebahan")
            },
        }]
    }).then(pemakaian => {
        response(200, "SUCCESS", pemakaian, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const AddBahan = async(data)=> {
    const kodebahan = data.kodebahan
    const nama = data.nama
    const warna = data.warna
    const gambar = data.gambar
    const satuan = data.satuan
    const ukuran = data.ukuran
    const kategori = data.kategori

    await Bahan.create({
        kodebahan, nama, warna, gambar, satuan, ukuran, kategori,
        roll_ball_quantity: 0,
        total_yard_kg : 0.0,
        yard_kg_clean : 0.0,
        yard_kg_sisa : 0.0
    }).then().catch(error => console.log(error))
}

const GetBahanByKodebahan = async (req, res)=> {
    const kodebahan = req.params.kodebahan
    await Bahan.findAll({where:{kodebahan}}).then(data => {
        response(200, "SUCCESS", data, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const EditBahanBaku = async(req, res) => {
    const kodebahan = req.params.kodebahan
    const data = {nama, kategori, ukuran, warna, satuan} = req.body

    await Bahan.update(data, {where: {kodebahan}, returning:true}).then((bhn) => {
        response(200, "SUCCESS", bhn, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const DeleteBahanBaku = async(req, res) => {
    const kodebahan = req.params.kodebahan 
    await Bahan.destroy({where: {kodebahan}})
    .then(response(200, "SUCCESS", [], res))
    .catch(error => console.log(error))
}

const GetDataWithFilter = async (req, res) => {
    // const data = {startDate, endDate, kategori } = req.query
    let {scanTime,startDate, endDate, kategori, kodebahan, warna } = req.query
    scanTime =='AllTime' ? scanTime = '' : scanTime = scanTime

    let whereCondition = {};

    if (kategori && scanTime && kodebahan ) {
        whereCondition.kodebahan = kodebahan;
        whereCondition.kategori = kategori;
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }

    if (kategori && scanTime ) {
        whereCondition.kategori = kategori;
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }
    if (kodebahan && scanTime ) {
        whereCondition.kodebahan = kodebahan;
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }
    if (kodebahan && kategori ) {
        whereCondition.kodebahan = kodebahan;
        whereCondition.kategori = kategori;
    }
    
    if (kodebahan) {
        whereCondition.kodebahan = kodebahan;
    }

    if (kategori) {
        whereCondition.kategori = kategori;
    }
    
    if (scanTime) {
        whereCondition.createdAt = {
            [Op.between]: [startDate, endDate]
        };
    }
    
    if (warna) {
		await Bahan.findAll({where: {
           warna: {
               [Op.like]: `%${warna}%`
           }
        }}).then(bhn => {
			console.log(bhn)
	        response(200, "SUCCESS", bhn, res)
	    }).catch(error => {
			console.log(error)
	        resError(500, process.env.ISE, error, res)
	    })
	} else {
		await Bahan.findAll({where: whereCondition}).then(bhn => {
			const dataFilter = {
				filter: {
					filter_flag : "Y",
					whereCondition,
				},
				bahan: bhn
			}
		
	        response(200, "SUCCESS", dataFilter, res)
	    }).catch(error => {
			console.log(error)
	        resError(500, process.env.ISE, error, res)
	    })
	}
}

const GetKodeBahan = async (req, res) => {
    const kodebahan = req.query.kodebahan
    await Bahan.findAll({
        attributes: ['kodebahan'],
        where: {
           kodebahan: {
               [Op.like]: `%${kodebahan}%`
           }
        }
    }).then(dt => {
        response(200, "SUCCESS", dt, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

module.exports = {
    GetBahan,
    GetKodeBahan,
    AddBahan,
    ListPemakaian, 
    GetBahanByKodebahan,
    DeleteBahanBaku,
    EditBahanBaku,
    GetDataWithFilter
}