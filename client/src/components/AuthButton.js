import React,{useContext} from 'react'
import {withRouter,Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import "../css/nav_style.css"
import { Dropdown } from 'react-bootstrap';

const classes = "btn btn-secondary"

const AuthButton = withRouter(({history})=>{
    const auth = useContext(AuthContext)
    if(!auth.isAuthenticated){
        return <Link className={classes} to='/login'>Login</Link>
    }

    const logout=()=>{
        auth.signout().then(()=>history.push('/'))//after logout which page user will see
    }

    return (
        <div>
            <Link to='/QRcode'></Link>
            {/* <button className={classes} onClick={logout}>Logout</button> */}
            <Dropdown>
                <Dropdown.Toggle className="user" variant="secondary">
                <i class="far fa-2x fa-user-circle"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item><Link className="link" to='/QRcode'>QR Code</Link></Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
})

export default AuthButton;