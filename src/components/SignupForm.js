import { React, useState } from 'react';

function SignupForm(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSignUp(username, email, password);
  };
  return (
    <div className='signupFormContainer'>
      <form onSubmit={handleSubmit}>
        <label>
          {' '}
          Username:
          <input
            name='username'
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          {' '}
          Email:
          <input
            name='email'
            type='text'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          {' '}
          Password:
          <input
            name='password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button>Create Account</button>
      </form>
    </div>
  );
}

export default SignupForm;
