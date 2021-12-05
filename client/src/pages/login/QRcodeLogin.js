import React,{useState,useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const QRcodeLogin=()=>{
    //1. need to check QRcode token is match with record in the DB, need to this by  authContext function authWithQRcode
    //2. if success, redirect to home page with logined user
    //3. if fail, redirect to login page
    const [redirect,setRedirect] = useState(false)
    const auth = useContext(AuthContext)
    
        const url_str = window.location.href
        const url = new URL(url_str)
        const userToken = url.searchParams.get("token")
        console.log(userToken)
        console.log(auth)
        auth.authWithQRcode(userToken)
        console.log(auth.isAuthenticated)
        if(auth.isAuthenticated){
            console.log("back to front end with user"+auth.isAuthenticated)
            setRedirect(true)
        }else{
            console.log("error happended in the QRcode login proceess"+auth.isAuthenticated)
        }

    return (
        <div>
            this page handle for QR code login request, process your request....
            {redirect?<Redirect to='/' />:<Redirect to='/login' />}
        </div>
    )
}
// QRcodeLogin.contextType = AuthContext;dd
export default QRcodeLogin;