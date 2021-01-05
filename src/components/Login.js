import { React, useState, useEffect } from "react";
import { auth, provider } from "../FirebaseConfig";
import firebase from "../FirebaseConfig.js";

const Login = (props) => {
  //state stuff
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // google login functionality
  const googleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const uid = result.user.uid;
        const displayName = result.user.displayName;
        //use methods on props to change state in App.js
        props.setId(uid);
        props.setLoggedIn(true);
        props.setUsername(displayName);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };
  //toggle show signup button
  const toggleShowSignup = () => {
    if (showSignup) {
      setShowSignup(false);
    } else {
      setShowSignup(true);
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        const { uid } = firebase.auth().currentUser;
        const userInfo = firebase.auth().currentUser;
        userInfo.updateProfile({
          displayName: username,
        });
        props.setId(uid);
        props.setLoggedIn(true);
        props.setUsername(username);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  //onchange

  // const handleChange = (event) => {
  //   const { value, name } = event.target;
  //   console.log(value, name);
  //   if()
  //   setEmail(value)
  // };

  return (
    <div className="loginPage">
      <h2 className="loginpageTitle">LOGIN PAGE</h2>
      <div className="googleLoginContainer">
        <button className="loginLink" onClick={googleLogin}>
          Sign In With Google
        </button>
      </div>
      <div className="signupButtonContainer">
        <button className="toggleSignupButton" onClick={toggleShowSignup}>
          {showSignup ? "hide signup" : "show signup"}
        </button>
      </div>
      {showSignup && (
        <div className="signupFormContainer">
          <form onSubmit={handleSignIn}>
            <label>
              {" "}
              Username:
              <input
                name="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </label>
            <label>
              {" "}
              Email:
              <input
                name="email"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              {" "}
              Password:
              <input
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button>Create Account</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
