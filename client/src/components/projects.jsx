import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../utils/mutations';
import '../css/register.css'

function Register({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Add useNavigate hook

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log(data);
      setEmail('');
      setPassword('');
      navigate('/login'); // Navigate to login page
    },
    onError: (error) => {
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user. Please try again.');
    },
  });

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'email') {
      setEmail(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    registerUser({
      variables: { email, password },
    })
    .then(() => {
      // This will run if the mutation completed successfully
      navigate('/login');
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user. Please try again.');
    });
  };

  return (
    <section>
    <div className="container">
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label for="email">Email:</label>
                    <input value={email} onChange={handleInputChange} type="email" name="email" class="form-control" id="username" placeholder="Enter a valid email"/>
                </div>
                <div className="form-group">
                    <label for="password">Password:</label>
                    <input value={password} onChange={handleInputChange} type="password" name="password" class="form-control" id="password" placeholder="Enter a strong password"/>
                </div>
                <button type="submit" className="btn btn-danger btn-block">{loading ? 'Loading...' : 'Submit'}</button>
                
            </form>
            <p> Already registered? <Link to="/" class="btn btn-outline-danger" >Login here </Link></p>
        </div>
    </div>
</section>
  );
}

export default Projects;
