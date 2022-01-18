const express =require ('express')
const handphoneRouter = require('./router/handphone') //import file handphone
const app = express()
const port = 3000

//Aktifkan tambahan setting default untuk req.body
app.use(express.json()) //for parsing application json
app.use(express.urlencoded({ extended: true })) //for parsing application

//Mengkoneksikan dengan database mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sp52');

//tambahkan pesan jika koneksi database berhasil
const db = mongoose.connection
db.on ('error', function(){
    console.log ('Koneksi Gagal')
})
db.once('open', function(){
    console.log ('Koneksi Berhasil')
})

// app.listen(3000,function (request,respon){
//     console.log('server berjalan lancar')
// })

// var myLogger = function (request, respon, next) {
//     console.log("LOGGED"); //pesan ini akan ditampilkan di terminal saat aplikasinya dilewati
//     next();
// };

// app.use(myLogger); //cara express js untuk mengaktifkan atau memasang middleware
//                     //sebelum dilanjutkan ke function selanjutnya
//                     //pasang middleware sebelum jalur route aplikasinya dijalankan
// // app.get("/", function (request, respon){ //function ini akan dijalankan ketika berhasil melewati middleware
// //     respon.send("Selamat Belajar Express Js");
// // });

const requestTime = function(request, respon, next) {
    date = new Date(); //pesan yang ingin ditampilkan
    console.log(date);
    next();
};

app.use(requestTime); //nama properti middleware bebas
app.set ('view engine','ejs') // tambahan settingan untuk jenis template yang digunakan
//app.use('/asset', express.static('public')) //untuk mengaktifkan static file

// app.get("/", function (request, respon){
//     const tanggal = "Selamat Belajar Express Js </br>" +
//     "<p><small>Requested at: " + date + "</small>"; //properti pesan dari middleware yang akan ditampilkan
//     respon.send(tanggal);
// });

app.use(handphoneRouter)

app.listen(port, () => {
    console.log(`Server baik-baik saja`)
})


app.get("/", function (request, respon){
    const sp52 = {
        Nim: 1119101747,
        Nama: "Nur Indah Pratiwi",
    };
    respon.render ('pages/index',{sp52: sp52})
});

app.get("/about", function (request, respon) {
    respon.render('pages/about')
});

app.use('/asset', express.static('public'))

// app.get("/cm", function (request,respon){
//     respon.render('pages/cm');
// })


//app.use(handphoneRouter) //tambahkan app.use nama const







//Routing halaman utama
// app.get('/', function(request,respon){
//     respon.send('Hallo! Nama Saya Nur Indah Pratiwi')
// })

// // membuat URL/about
// app.get('/about', function(request,respon){
//     respon.send('About!! Saya Mahasiswi Semester 5')
// })

// // method post untuk create atau mengirimkan ke server untuk disimpan di database
// app.post('/', function(request,respon){
//     respon.send('post!! Tambahkan Mahasiswi Semester 5')
// })

// // method put untuk mengirim data ke server dengan id yg spesifik untuk tujuan update database
// app.put('/user', function(request,respon){
//     respon.send('put!! Update Mahasiswi Semester 5')
// })

// // method delete menghapus data berdasarkan id tertentu
// app.delete('/user', function(request,respon){
//     respon.send('delete!! Saya Mahasiswi Semester 5')
// })

// // membuat route studi kasus handphone
// // app.route('/handphone')
// // .get(function (request, respon){
// //     respon.send('Tampilkan Data Handphone') //menampilkan data
// // })

// // .post(function (request, respon){
// //     respon.send('Tambahkan Data Handphone') //menambahkan data
// // })

// // .put(function (request, respon){
// //     respon.send('Update Data Handphone') //mengupdate data
// // })

// // .delete(function (request, respon){
// //    respon.send('Menghapus Data Handphone') //menghapus data 
// // })
