import React from 'react';
import {Link} from 'react-router-dom';
import Logo from "../images/Time_Swing_for_white.png";
import "../css/welcome_style.css";
import "../css/animated_button.css";

function Welcome() {
  return (
    <div className="container px-4 py-5 section-features" id="hanging-icons">
    <div className="pb-2 border-bottom">
      <img className="logo_style mb-3"src={Logo} alt="logo"/>
      <h3>Time Swing helps you keep on track every day!</h3>
    </div>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 pb-2 border-bottom">
      <div className="col d-flex align-items-start">
        <div className="icon-square text-dark flex-shrink-0 me-3">
          <i className="fas fa-bolt fa-4x"></i>
        </div>
        <div>
          <h2>Easy Input</h2>
          <p>Input an agenda as quick as 5 seconds!</p>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-dark flex-shrink-0 me-3">
          <i class="fas fa-qrcode fa-4x"></i>
        </div>
        <div>
          <h2>Cross Platforms</h2>
          <p>Just scan a QR code, then switch to another device.</p>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-dark flex-shrink-0 me-3">
        <i class="fas fa-map-marked-alt fa-4x"></i>
        </div>
        <div>
          <h2>Ready to Go</h2>
          <p>Time Swing provides real-time weather and traffic information for your next move.</p>
        </div>
      </div>
    </div>
    <div className="mt-5 row row-cols-1 row-cols-lg-3" >
      <Link to="/login" className="Abtn">
        Try it Today
      </Link>
    </div>
  </div>
  );
}

export default Welcome;

