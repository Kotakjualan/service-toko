const { async } = require("@firebase/util");
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

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

app.post('/update/toko', express.json(), async (req,res) =>{

    const {nama, deskripsi, email, alamat, noTelp, foto, banner} = req.body;

    console.log(req.body);

    const resCheck = await modelToko.checkToko(email);

    if(resCheck.status){

        const resUpdate = await modelToko.registerToko(nama, deskripsi, email, alamat, noTelp, foto, banner);

        res.status(200).json({message:"Toko Berhasil Diupdate!"});
        return;
    }
    
    res.status(500).json({message:"Toko Gagal Diupdate!"});

});

app.post('/delete/toko', express.json(), async (req,res) =>{

    const {nama, deskripsi, email, alamat, noTelp, foto, banner} = req.body;

    const resCheck = await modelToko.checkToko(email);

    if(resCheck.status){

        const resDelete = await modelToko.deleteToko(email);

        res.status(200).json({message:"Toko Berhasil Dihapus!"});
        return;
    }
    
    res.status(500).json({message:"Toko Gagal Dihapus!"});

})


// app.get('/get/toko/:email', async (req,res) =>{

//     const {email} = req.params;

//     const resCheck = await modelToko.checkToko(email);

//     if(resCheck.status){
//         res.status(200).json({
//             message:"Toko Berhasil Ditemukan!",
//             data:resCheck.data
//         });

//         return;
//     }
  
//     res.status(500).json({
//         message:"Toko Tidak Ditemukan!",
//         data:resCheck.data
//     });

// });

app.listen(4500);