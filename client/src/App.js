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
import Login  from './pages/login/Login';
import './App.css';
<<<<<<< HEAD
import Login from './pages/login/login';

=======
import { AuthProvider } from './context/AuthContext';
import AuthButton from './components/AuthButton';
import PrivateRoute from './components/PrivateRoute';
import QRcode from './components/QRcode';
import QRcodeLogin from './pages/login/QRcodeLogin';
>>>>>>> 201123af903ef14483b0cac09c1cf0d06d3285ce

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">Time Swing</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/agenda/new">

            Create a New Agenda

          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About
          </NavLink>
        </li>
        <li>
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
                <PrivateRoute path="/agenda/new" component={PostAgenda} />
                <PrivateRoute path="/agenda/:id" component={ShowAgenda} />
                <Route path="/QRcode" component={QRcode} />
                <Route path="/QRcodeLogin" component={QRcodeLogin} />
                <Route path="/about-us" component={AboutUsPage} />
                <Route path="/login" component={Login} />
                <Route path="/" component={ShowAllAgenda} />
                
              </Switch>
            </div>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}


export default App;
