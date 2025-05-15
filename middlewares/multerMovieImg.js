const multer = require('multer');

const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, './public/imgs/movies-cover');
},
filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
}
});

// contains all setting for store img
const upload = multer({ storage });

module.exports = upload;