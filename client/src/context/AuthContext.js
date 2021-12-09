import React,{createContext,useEffect,useState} from 'react';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider=({children})=>{
    const [user,setUser] = useState(false);

    useEffect(()=>{
        const url='/api/auth/login'
        fetch(url)
            .then(response=>{
                console.log("quick check user code:" + response.status)
                if(!response.ok){
                    throw new Error('Unauthenticated')
                }

                return response.json()
            })
            .then(body=>setUser(body))
            .catch(err=>setUser(false))
    },[])
    const quickCheckUSer = ()=>{
        const url='/api/auth/login'
        fetch(url)
            .then(response=>{
                console.log("quick check user code:" + response.status)
                if(!response.ok){
                    throw new Error('Unauthenticated')
                }

                return response.json()
            })
            .then(body=>setUser(body))
            .catch(err=>setUser(false))
    }
    const signup = (email,password,phone)=>{
        const url = 'api/auth/signup'
        return fetch(url,{
            method:'POST',
            body:JSON.stringify({email,password,phone}),
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error('Signup Failed')
            }

            return response.json()
        })
        .then((body)=>{
            setUser(body)
            return body
        });
    }//end of signup

    const authenticate = (email,password) =>{
        const url='/api/auth/login'
        return fetch(url,{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error('Login Failed')
            }

            return response.json()
        })
        .then((body)=>{
            setUser(body)
            return body
        });
    }//end of authenticate

    const authWithQRcode = (inputToken)=>{
        console.log("in the authQR :"+inputToken)
        const url="/api/auth/QRcodeLogin"
        //use post method here
        fetch(url,{
            method:'POST',
            body:JSON.stringify({inputToken}),
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then(result=>{
            console.log("in the returning reuslt")
            if(!result.ok){
                throw new Error('QRLogin Failed')
            }
            return result.json()
        })
        .then((body)=>{
            console.log(body)
            setUser(body)
            return body
        })
        .catch(err=>{console.log(err)});
    }//end of authWithQRcode
    
    const signout =()=>{
        const url='/api/auth/logout'
        return fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Login Failed')
            }
        })
        .then((body)=>{
            setUser(false)
            return body
        });
    }//end of signout

   
    return (
        <Provider value={{
            quickCheckUSer,
            authenticate,
            authWithQRcode,
            signup,
            signout,
            isAuthenticated: user?true:false,
            user,
            }
        }>
            {children}
        </Provider>
    )
}
export {AuthContext,AuthProvider}