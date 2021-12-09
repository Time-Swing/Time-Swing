import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';



import PostAgenda from './pages/agenda/PostAgenda';
import AboutUsPage from './pages/AboutUsPage';
import ShowAllAgenda from './pages/agenda/ShowAllAgenda'
import ShowAgenda from './pages/agenda/ShowAgenda';
import Login  from './pages/login/login';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import AuthButton from './components/AuthButton';
import PrivateRoute from './components/PrivateRoute';
import QRcode from './components/QRcode';
import QRcodeLogin from './pages/login/QRcodeLogin';
import Signup from './pages/login/signup';
import Welcome from './pages/Welcome';
import Transfer from './pages/Transfer';
import "../src/css/nav_style.css";
import Logo from "../src/images/logo.png"


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light shadow mb-3">
      <Link className="navbar-brand" to="/agendas"><img className="logo" src={Logo} alt="logo"/></Link>
      <ul className="navbar-nav mr-auto barFont">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/agenda/new">
          <i class="far fa-lg fa-calendar-plus"></i> Create a New Agenda
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About
          </NavLink>
        </li> */}
        </ul>
        <ul className="nav justify-content-end">
        <li className="nav-item">
          <AuthButton/>
        </li>
        </ul>

    </nav>
  );
}


class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <PrivateRoute  path="/agenda/new" component={PostAgenda} />
                <PrivateRoute  path="/agenda/:id" component={ShowAgenda} />
                <PrivateRoute  excat path="/agendas" component={ShowAllAgenda} />
                <Route  path="/transfer" component={Transfer} />
                <PrivateRoute  path="/QRcode" component={QRcode} />
                <Route  path="/QRcodeLogin" component={QRcodeLogin} />
                <Route  path="/about-us" component={AboutUsPage} />
                <Route  path="/login" component={Login} />
                <Route  path="/signup" component={Signup} />
                <Route excat path="/" component={Welcome} />
              </Switch>
            </div>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}


export default App;
