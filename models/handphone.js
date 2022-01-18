const mongoose = require('mongoose')
const { Schema } = mongoose

//membuat tabel handphone dengan schema
const handphoneSchema = new Schema({
    namahp: String,
    jenis: String,
    harga: String,
    password: String
},
    { timestamps: true });

//ekspor tabel handphone
const Handphone = mongoose.model('Handphone', handphoneSchema)
module.exports = Handphone