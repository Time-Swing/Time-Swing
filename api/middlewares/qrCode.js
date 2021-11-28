const QRCode = require('qrcode');

function createQRCode(url){
    return QRCode.toString(url,err=>console.log("error happend in generate QR code : "+err))
}

module.exports = createQRCode;