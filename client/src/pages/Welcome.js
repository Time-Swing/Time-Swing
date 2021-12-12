import React from 'react';
import Logo from "../images/Time_Swing_for_white.png";
import "../css/welcome_style.css";

function Welcome() {
  return (
    <section class="section-features">
    <div class="row">
      <h2>Get food fast — not fast food</h2>
      <p class="long-copy">
        Hello, we are Omnifood, your new premium food delivery service. We know you are always busy. No time for cooking. So let us take care of that, we’re really good at it, we promise!
      </p>
    </div>
    <div class="row js--wp-1 animated fadeIn">
      <div class="col span-1-of-4 box">
        <h3>
          <ion-icon name="infinite-outline" class="icon-b md hydrated" role="img" aria-label="infinite outline"></ion-icon> Up to 365 days/year
        </h3>
        <p>
          Never cook again! We really mean that. Our subscription plans include up to 365 days/year coverage. You can also choose to order more flexibly if that's your style.
        </p>
      </div>
      <div class="col span-1-of-4 box">
        <h3>
          <ion-icon name="hourglass-outline" class="icon-b md hydrated" role="img" aria-label="hourglass outline"></ion-icon> Ready in 20 minutes
        </h3>
        <p>
          You're only twenty minutes away from your delicious and super healthy meals delivered right to your home. We work with the best chefs in each town to ensure that you're 100% happy.
        </p>
      </div>
      <div class="col span-1-of-4 box">
        <h3>
          <ion-icon name="cafe-outline" class="icon-b md hydrated" role="img" aria-label="cafe outline"></ion-icon> 100% organic
        </h3>
        <p>
          All our vegetables are fresh, organic and local. Animals are raised without added hormones or antibiotics. Good for your health, the environment, and it also tastes better!
        </p>
      </div>
      
    </div>
  </section>
  );
}

export default Welcome;