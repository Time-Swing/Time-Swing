//import { response } from 'express';
import React,{useState,useEffect} from 'react'

function QRcode(){
    const [qrcode,setQrcode] = useState(false);
    useEffect(() => {
        fetch('/api/auth/reqQRCode')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setQrcode(data)
        })
    }, [])
    return (
        <div>
            <img src={qrcode} alt="QRcode"/>
        </div>
    )
}

export default QRcode;