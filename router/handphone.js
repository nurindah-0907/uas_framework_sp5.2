const express =require('express') //import (require) module express lalu simpan di const express
const router = express.Router() //instance object express untuk menjalankan route secara modular
const handphonecontroller = require('../controllers/handphone')// import data dari file handphone.js di folder controller

router.route('/handphone') //sintak app. ganti dengan router
    .get(handphonecontroller.index)// handphonecontroller digunakan untuk memanggil properti index pada file handphone.js
    .post(handphonecontroller.tambah)

router.get('/handphone/create', handphonecontroller.create)
router.get('/handphone/:id',handphonecontroller.show)

router.put('/handphone/:id', handphonecontroller.update)
router.delete('/handphone/:id', handphonecontroller.delete)
router.route('/handphone/update').post(handphonecontroller.baharui)
router.get('/handphone/hapus/:id', handphonecontroller.hapus)
router.route('/handphone/update/:_id/:ID/:namahp/:jenis/:harga/:password').get(handphonecontroller.renderUpdate)


// Update data
router.put('/handphone/:id', handphonecontroller.update)

//menghapus data
router.delete('/handphone/:id', handphonecontroller.delete)


module.exports = router //modul ini diisi route khusus untuk (URL:/handphone),
                        //dan sudah bisa di exports