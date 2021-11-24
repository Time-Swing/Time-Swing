import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
// import PostsListPage from './pages/PostsListPage';
// import ShowPostPage from './pages/ShowPostPage';
//import PostFormPage from './pages/PostFormPage';
import PostAgenda from './pages/agenda/PostAgenda';
import AboutUsPage from './pages/AboutUsPage';
import ShowAllAgenda from './pages/agenda/ShowAllAgenda'
import ShowAgenda from './pages/agenda/ShowAgenda';
import Login  from './pages/login/Login';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import AuthButton from './components/AuthButton';
import PrivateRoute from './components/PrivateRoute';


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">Micro Blog</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/agenda/new">
            Create a Micro Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
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
