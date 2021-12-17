const { async } = require("@firebase/util");
const express = require("express");
const req = require("express/lib/request");

const app = express();

require("./helper/firebase-config");
const modelToko =  require("./src/toko");

app.post('/create/toko', express.json(), async (req,res) =>{

    const {nama, deskripsi, email, alamat, noTelp, foto, banner} = req.body;

    console.log(req.body);

    const resRegister = await modelToko.registerToko(nama, deskripsi, email, alamat, noTelp, foto, banner);

    if(resRegister === true){
        res.status(200).json({message:"Toko Berhasil Didaftarkan!"});
        return;
    }
    
    res.status(500).json({message:"Toko Gagal Didaftarkan!"});
});


//get nya masih salah krn masih bisa nemu toko yang ga terdaftar
app.get('/get/toko/:email', async (req,res) =>{

    const {email} = req.params;

    const resCheck = await modelToko.checkToko(email);

    if(resCheck.status === true){
        res.status(200).json({message:`Toko Ditemukan!`});
        data:resCheck.data;
    }
    
    return;
})

app.listen(4500);