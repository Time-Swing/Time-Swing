import React,{ useContext} from 'react'
import {Redirect,Route} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = ({component:Component,...rest})=>{
    const auth = useContext(AuthContext)
    // const [nextStep,setnextStep] = useState(false)
    
    // useEffect(()=>{
    //     auth.quickCheckUSer()
    //     // if(auth.isAuthenticated){
    //     //     console.log("the auth is scuess")
    //     //     setnextStep(true)
    //     // }else{
    //     //     console.log("the auth Failed")
    //     //     setnextStep(false)
    //     // }
    // },[])

    console.log("auth: "+auth.isAuthenticated)
    return (
        <Route {...rest} render={(props)=>
            (
                auth.isAuthenticated
                ?<Component {...props}/>
                :<Redirect to={{
                    pathname:'/login',
                    state:{from:props.location}
                }}/>
            )}/>
    )
}

export default PrivateRoute;