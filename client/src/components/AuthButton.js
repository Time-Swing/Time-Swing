import React,{useContext} from 'react'
import {withRouter,Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const classes = "btn btn-primary"

const AuthButton = withRouter(({history})=>{
    const auth = useContext(AuthContext)
    if(!auth.isAuthenticated){
        return <Link className={classes} to='/login'>Login</Link>
    }

    const logout=()=>{
        auth.signout().then(()=>history.push('/'))//after logout which page user will see
    }

    return (
        <div className='text-white'>
            <Link to='/QRcode'>Welcome! {auth.user.userName}</Link>
            <button className={classes} onClick={logout}>Logout</button>
        </div>
    )
})

export default AuthButton;