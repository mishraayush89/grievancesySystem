import React, { Component } from 'react';
import '../App.css';



function Login(){
    return(
        
        <div>
        <body>
             <main>
      <section className="left">
        <div className="logo">
          <img
            className="beer"
            src="https://image.iccpic.com/previews/d2/8b/5d/45ea07370ad9ce0f.svg"
          />
        </div>
        <h2 className="subheading">
          Student Grievence Cell
        </h2>
        <img
          className="rocket"
          src="student.png"
        />
        <h2 className="subheading">
          We are here to help!
        </h2>

        
      </section>
      <section className="right">
     
        <div className="top-signup">
          <button className="signin">Sign In</button>
          <button className="signup">Sign Up</button>
        </div>
        <section className="form">
          <nav>
            <a>Sign In</a> <span>or</span> <a className="term-service">Sign Up</a>
          </nav>
          <form>
            <div className="form-row">
              <label>FULL NAME</label
              ><input className="input-box" placeholder="Enter your full name" />
            </div>
            <div className="form-row">
              <label>PASSWORD</label
              ><input
                className="input-box"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="form-row">
              <label>E-MAIL</label
              ><input className="input-box" placeholder="Your e-mail goes here" />
            </div>
            <div className="term">
              <input className="checkbox" type="checkbox" /> I agree to all
              statements in
              <a className="term-service" href="http://www.google.com">
                terms of service</a
              >
            </div>
            <button className="bottom-button">Sign Up</button>
            <a className="already-member">I'm already a member</a>
          </form>
        </section>
      </section>
    </main>
     </body>
        </div>
    )
}

export default Login;