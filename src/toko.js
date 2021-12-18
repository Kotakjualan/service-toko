const { async } = require("@firebase/util");
const { doc, setDoc, getDoc} =  require("firebase/firestore");
const connection =  require("./connection");

function getCollection(){
    return "Toko"
}


async function registerToko(nama, deskripsi, email, alamat, noTelp, foto, banner){

    const docToko =  doc(connection.getConnetion(),getCollection(), email);

    const objData = {
        nama: nama,
        deskripsi: deskripsi,
        alamat: alamat,
        noTelp: noTelp,
        foto: foto,
        banner: banner
    }

    try {
        await setDoc(docToko, objData);
    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
}

async function checkToko(email){

    const docToko = doc(connection.getConnetion(),getCollection(), email);

    const data = await getDoc(docToko);

    const objRespond = {
        status: false,
        data: null
    }

    if(!data.exists()){
        return objRespond;
    }

    objRespond.status =  true;
    objRespond.data = data.data();

    return objRespond;
}

module.exports = {registerToko,checkToko};