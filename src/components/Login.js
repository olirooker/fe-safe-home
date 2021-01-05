import { React, useState, useEffect } from 'react';
import { auth, provider, firebase } from '../FirebaseConfig.js';

const Login = (props) => {
  //state stuff
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

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

  //onchange

  // const handleChange = (event) => {
  //   const { value, name } = event.target;
  //   console.log(value, name);
  //   if()
  //   setEmail(value)
  // };

  return (
    <div className='loginPage'>
      <h2 className='loginpageTitle'>LOGIN PAGE</h2>
      <div className='googleLoginContainer'>
        <button className='loginLink' onClick={googleLogin}>
          Sign In With Google
        </button>
      </div>
      <div className='signupButtonContainer'>
        <button className='toggeSignupButton' onClick={toggleShowSignup}>
          {showSignup ? 'hide signup' : 'show signup'}
        </button>
      </div>
      {showSignup && (
        <div className='signupFormContainer'>
          <form>
            <label>
              {' '}
              Username
              <input
                name='username'
                type='text'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <label>
              {' '}
              email
              <input
                name='email'
                type='text'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
