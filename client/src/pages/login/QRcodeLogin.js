import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function QRcodeLogin(){
    //1. need to check QRcode token is match with record in the DB
    //2. if success, redirect to home page with logined user
    //3. if fail, redirect to login page
    return (
        <div>
            this page handle for QR code login request
        </div>
    )
}

export default QRcodeLogin;