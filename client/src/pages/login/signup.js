import React from 'react';
import { Redirect,Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LogoWhite from "../../images/Time_Swing_for_white.png";
import "../../css/login_style.css";

class Signup extends React.Component{
    state = {
        redirectToReferrer:false,
        failed:false,
        email:'',
        password:'',
        phone:'',
    }

    //handle user input data change
    handleChange=(name)=>{
        return (event)=>{
            let {value}=event.target
            this.setState({[name]:value})
        }
    }

    signup=(event)=>{
        event.preventDefault();
        const auth= this.context;
        let {email,password,phone} = this.state;
        auth.signup(email,password,phone)
            .then((user)=>{
                this.setState({redirectToReferrer:true})
            })
            .catch(err=>{
                this.setState({failed:true})
            });
    }

    render(){
        const {from} = {from:{pathname:'/'}}
        const {redirectToReferrer,failed} = this.state;

        //if user come from other page 
        if(redirectToReferrer){return <Redirect to={from}/>}

        let err=''
        if(failed){
            err =<div className="alert alert-danger" role='alert'>Login Failed</div>
        }

        return (
            <div className="login_form">
                <form onSubmit={this.signup}>
                    {err}
                    <img className="mb-4" src={LogoWhite} alt="" width="100" height="100"/>
                    <h1 className="h3 mb-3 fw-normal">create you own account today</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={this.handleChange('email')}/>
                        <label>Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={this.handleChange('password')}/>
                        <label>Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="phone" placeholder="Phone#" onChange={this.handleChange('phone')}/>
                        <label>Phone#</label>
                    </div>
                    <br/>

                    <button className="w-100 btn btn-lg btn-secondary" type="submit">Sign Up</button>
                    <p><Link to='/login'>already have a account? login here</Link></p>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </div>
        )
    }
}

Signup.contextType = AuthContext;
export default Signup;