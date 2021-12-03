import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import TempLogo from "../../images/tempLogo.png";
import "../../css/login_style.css";

class Login extends React.Component{
    state = {
        redirectToReferrer:false,
        failed:false,
        email:'',
        password:'',
    }

    //handle user input data change
    handleChange=(name)=>{
        return (event)=>{
            let {value}=event.target
            this.setState({[name]:value})
        }
    }

    login=(event)=>{
        event.preventDefault();
        const auth= this.context;
        let {email,password} = this.state;
        auth.authenticate(email,password)
            .then((user)=>{
                this.setState({redirectToReferrer:true})
            })
            .catch(err=>{
                this.setState({failed:true})
            });
    }

    render(){
        const {from} = this.props.location.state || {from:{pathname:'/'}}
        const {redirectToReferrer,failed} = this.state;

        //if user come from other page 
        if(redirectToReferrer){return <Redirect to={from}/>}

        let err=''
        if(failed){
            err =<div className="alert alert-danger" role='alert'>Login Failed</div>
        }

        return (
            <div className="login_form">
                <form onSubmit={this.login}>
                    {err}
                    <img className="mb-4" src={TempLogo} alt="" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={this.handleChange('email')}/>
                    <label>Email address</label>
                    </div>
                    <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={this.handleChange('password')}/>
                    <label>Password</label>
                    </div>
                    <br/>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p><a href='/'>forget password</a></p>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </div>
        )
    }
}

Login.contextType = AuthContext;
export default Login;