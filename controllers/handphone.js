const { response } = require("express")
const { render } = require("express/lib/response")
const respon = require("express/lib/response")

//import modul hp dari fie handphone.js di Model

//import tabel Handphone
const Handphone = require("../models/handphone")

//membuat data array /anggap saja data ini berasal dari model
// let handphone = [
//     {id: 1, namahp: 'OPPO', jenis : 'A12', harga: '1.950.000'},
//     {id: 2, namahp: 'VIVO', jenis : 'Y12', harga: '1.600.000'}
// ]

module.exports =//lakukan module export sebuah objek
{
    index: function (request, respon) { //membuat properti function dengan nama index
        Handphone.find(function (error, handphone) {
            if (error) console.log(error)
            console.log(handphone)
            respon.render("pages/handphone/index", { handphone })
        })
    },
    show: function (request, respon) {
        const id = request.params.id

        Handphone.findById(id, function (error, data) {
            if (error) console.log(error)
            console.log(data)
            respon.render('pages/handphone/show', { handphone: data })
        })
    },

    create: function (request, respon) {
        respon.render('pages/handphone/create')
    },

    tambah: function (request, respon) {
        const handphone = new Handphone({
            ID: request.body.id,
            namahp: request.body.namahp,
            jenis: request.body.jenis,
            harga: request.body.harga,
            password: request.body.password
        })
        handphone.save(function (error) {
            if (error) return handleError(error);
            respon.redirect('/handphone')
        })
    },

    update: function (request, respon) {
        const id = request.params.id
        let isFound = false
        console.log(id)
        Handphone.filter(hp => { //filter adalah metode update dari js (agar data buku di filter satu-satu)
            if (hp.id == id) { //untuk pengecekan kondisi
                hp.id = id
                hp.namahp = request.body.namahp
                hp.jenis = request.body.jenis
                hp.harga = request.body.harga
                hp.password = request.body.password

                respon.send({
                    status: true,
                    data: handphone,
                    message: 'Data handphone berhasil diupdate',
                    method: request.method,
                    url: request.url,
                    tanggal: new Date()
                })
                isFound = true;
                return hp
            }
        })
        if (isFound == false) {
            respon.send({
                status: false,
                message: "handphone tidak ditemukan"
            })
        }
        respon.json(handphone) //tampilkan data katalog yang baru
    },

    baharui: function (request, respon) {
        const _id = request.body._id
        const ID = request.body.id
        const namahp = request.body.namahp
        const jenis = request.body.jenis
        const harga = request.body.harga
        const password = request.body.password
        const filter = { _id: _id };
        const update = {
            ID: ID,
            namahp: namahp,
            jenis: jenis,
            harga: harga,
            password: password
        };
        Handphone.updateOne(filter, update, function (err) {
            console.log(namahp, jenis, harga, password)
            respon.redirect('/handphone')
        });
    },

    renderUpdate: function (request, respon) {
        const ID = request.params._id
        Handphone.findById(ID, function (error, data) {
            if (error) console.log(error)
            console.log(data)
            respon.render('pages/handphone/update', { handphone: data })
        })
    },

    hapus: function (request, respon) {
        const id = request.params.id
        Handphone.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            respon.redirect('/handphone')
        });
    },

    delete: function (request, respon) {
        const id = request.params.id;
        let isFound = false
        handphone.filter(hp => {
            if (hp.id == id) {
                const index = handphone.indexOf(pro)
                handphone.splice(index, 1)
                respon.send({
                    status: true,
                    data: handphone,
                    message: 'Data handphone berhasil dihapus',
                    method: request.method,
                    url: request.url,
                    tanggal: new Date()
                })
                isFound = true
            }
        })
        if (isFound == false) {
            respon.json({
                status: false,
                message: "Handphone tidak ditemukan"
            })
        }
        respon.json(handphone)
    }
}