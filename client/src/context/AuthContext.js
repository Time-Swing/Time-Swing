import React,{createContext,useEffect,useState} from 'react';

const AuthContext = createContext();
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
        const url="/api/auth/QRcodeLogin?inputToken="+inputToken
        fetch(url)
            .then(result=>{
                if(!result.ok){
                    throw new Error('Login Failed')
                }
                return result.json()
            })
            .then((body)=>{
                setUser(body)
                return body
            });
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
            authenticate,
            authWithQRcode,
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