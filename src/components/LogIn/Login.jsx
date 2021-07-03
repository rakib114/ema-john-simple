import React, { useContext } from 'react';
import { useState } from "react";
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


const Login = () => {
    
    
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
      isSignIn: false,
      name: "",
      email: "",
      password: "",
      photo: "",
      error: "",
      success: false,
    });
    initializeLoginFramework();
    const [logedInUser, setLogedInUser] = useContext(userContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleRsponse = (res, redirect)=>{
      setUser(res)
        setLogedInUser(res);
        if(redirect){
          history.replace(from);
        }
    }
    //Google Sign In Function;
    const googleSignIn = () =>{
      handleGoogleSignIn()
      .then(res => {
        handleRsponse(res, true);
      })
    }
    //Sign Out Function;
    const signOut = () =>{
      handleSignOut()
      .then(res =>{
        handleRsponse(res, false);
      })
    }
    //Facebook Sign In
    const fbSignIn = ()=>{
      handleFbSignIn()
      .then(res =>{
        handleRsponse(res, true);
      })
    }
    const handleBlur = (event) => {
      // console.log(event.target.name, event.target.value);
      //Email Validation>
      let isFormValid = true;
      if (event.target.name === "email") {
        isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      }
      if (event.target.name === "password") {
        const isPasswordValid = event.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(event.target.value);
        isFormValid = isPasswordValid && passwordHasNumber;
      }
      if (isFormValid) {
        const newUserInfo = { ...user };
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);
      }
    };
    const handleSubmit = (evnt) => {
      if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res =>{
          handleRsponse(res, true);
        })
      }
      if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          handleRsponse(res, true);
        })
      }
      evnt.preventDefault();
    };
  
    
  
    return (
      <div style={{textAlign:'center'}}>
        {user.isSignIn ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={googleSignIn}>Google Sign in</button>
        )}
        <br />
        <br />
        {/* FaceBook_Login */}
        <button onClick={fbSignIn}>Facebook Login</button>
  
        <h2>Our Own Authentication</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="checkbox"
            name="newUser"
            id=""
            onChange={() => setNewUser(!newUser)}
          />
          <label htmlFor="newUser">New User Sign Up</label>
          <br />
          {newUser && (
            <input type="text" name="name" placeholder="Enter Full Name" />
          )}
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            onBlur={handleBlur}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onBlur={handleBlur}
          />
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </form>
        <p style={{ color: "red" }}>
          {" "}
          <strong>{user.error}</strong>{" "}
        </p>
        {user.success && (
          <p style={{ color: "green" }}>
            {" "}
            <strong>
              Succesfully {newUser ? "Created" : "Logged In"} Your Acoutn
            </strong>{" "}
          </p>
        )}
      </div>
    );
};

export default Login;