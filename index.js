const { async } = require("@firebase/util");
const express = require("express");
const req = require("express/lib/request");

const app = express();

const firebase = require("./helper/firebase-config");
const modelToko =  require("./src/toko");

app.post('/create/toko', async (req,res) =>{

    const {email} = req.params;

    const resRegister = await modelToko.registerToko(nama, deskripsi, email, alamat, noTelp, foto, banner);

    if(resRegister === true){
        res.status(200).json({message:"Toko Berhasil Didaftarkan!"});
        return;
    }

    res.status(500).json({message:"Toko Gagal Didaftarkan!"});
});

app.get('/get/staff/:email', async (req,res) =>{

    const {email} = req.params;

    const resCheck = await modelToko.checkToko(email);

    if(resCheck.status === true){
        res.status(200).json({message:`Toko Ditemukan!`});
        data:resCheck.data;
    }
    
    return;
})