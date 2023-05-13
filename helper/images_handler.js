const multer = require('multer');
const path = require('path');
// const pimage = require("../public/assets/bahanbaku")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../public/assets/bahanbaku');
    },
    filename: function(req, file, cb) {
      const nama = req.body.kodebahan
      cb(null, nama + new Date().getTime() + '_');
    }
  });

const filterGambar = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = {
    storage,
    filterGambar
}