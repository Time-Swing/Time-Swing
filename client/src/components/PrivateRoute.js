import React,{ useContext} from 'react'
import {Redirect,Route} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = ({component:Component,...rest})=>{
    const auth=useContext(AuthContext)
    console.log("auth: "+auth.isAuthenticated)
    return (
        <Route {...rest} render={(props)=>
        (
            auth.user 
            ?<Component {...props}/>
            :<Redirect to={{
                pathname:'/login',
                state:{from:props.location}
            }}/>
        )}/>
    )
}

export default PrivateRoute;