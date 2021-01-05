import { React, useState } from 'react';

function SignInEmail(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signInEmail(email, password);
  };
  return (
    <div className='signInEmail'>
      <form onSubmit={handleSubmit}>
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
        <button>Log In</button>
      </form>
    </div>
  );
}

export default SignInEmail;
