import React,{useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function QRcodeLogin(props){
    //1. need to check QRcode token is match with record in the DB, need to this by  authContext function authWithQRcode
    //2. if success, redirect to home page with logined user
    //3. if fail, redirect to login page
    const [redirect,setRedirect] = useState(false)
    
    useEffect(() => {
        const userToken = props.match.params.token
        const auth= this.context;
        console.log(userToken)
        auth.authWithQRcode(userToken)
            .then((user)=>{
                setRedirect(true)
            })
            .catch(err=>{
                console.log("error happended in the QRcode login proceess")
            });
    }, [])

    return (
        <div>
            this page handle for QR code login request, process your request....
            {redirect?<Redirect to='/' />:<Redirect to='/login' />}
        </div>
    )
}
QRcodeLogin.contextType = AuthContext;
export default QRcodeLogin;