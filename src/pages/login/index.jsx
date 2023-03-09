import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [haveAccount, setHaveAccount] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });
  const [registerFormData, setRegisterFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: ''
  });

  const handleAccountConfirmationClick = () => {
    setHaveAccount(previousValue => !previousValue);
  };

  const handleRegisterDetailChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData(previousData => ({
      ...previousData,
      [name]: value
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(previousData => ({
      ...previousData,
      [name]: value
    }));
  };
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (registerFormData.password === registerFormData.confirmPassword) {
      callCreateUserAPI(registerFormData);
    }
  };
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    sendLoginData(formData);
  };

  const sendLoginData = async (loginCredentials) => {
    var data = ({
      'userName': loginCredentials.userName,
      'password': loginCredentials.password
    });
    const response = await axios.post(
      'http://localhost:7000/login',
      { data },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('RESPONSE: ', response);
    if (response.data.message === 'logged in successfully') {
      localStorage.setItem('token', response.data.token);
      console.log('SET LOCALSTOGARE ', localStorage.getItem('token'));
      navigate('/home');
    }

  };

  const callCreateUserAPI = async (userDetails) => {
    var data = ({
      'userName': userDetails.userName,
      'password': userDetails.password
    });
    const response = await axios.post(
      'http://localhost:7000/user',
      { data },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.data.message === 'user alredy exist') {
      console.log('user alredy exist');
    }

  };
  // const tokenGOT = localStorage.getItem('token')

  return (
    <div className="login-page">
      <div className="login-page-decoration">

      </div>
      <div className="login-wrapper">
        <div className="form-container">
          {haveAccount && <form className="form" onSubmit={handleLoginSubmit}>
            <input
              type="username"
              className="form-input"
              placeholder='UserName'
              value={formData.userName}
              name='userName'
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              className="form-input"
              placeholder='Password'
              value={formData.password}
              name='password'
              onChange={handleChange}
            />
            <br />
            <button className='submit-button'>Login</button>
          </form>}
          {!haveAccount && <form className="form" onSubmit={handleRegisterSubmit}>
            <input
              type="username"
              className="form-input"
              placeholder='UserName'
              value={registerFormData.userName}
              name='userName'
              onChange={handleRegisterDetailChange}
            />
            <br />
            <input
              type="password"
              className="form-input"
              placeholder='Password'
              value={registerFormData.password}
              name='password'
              onChange={handleRegisterDetailChange}
            />
            <br />
            <input
              type="password"
              className="form-input"
              placeholder='Confirm Password'
              value={registerFormData.confirmPassword}
              name='confirmPassword'
              onChange={handleRegisterDetailChange}
            />
            <br />
            <button className='submit-button'>Register</button>
          </form>}
          <div className="confirmation-text">
            {!haveAccount && <span className="login-confirmation">Already have an account? <span className="login-text" onClick={handleAccountConfirmationClick}>Login</span></span>}
            {haveAccount && <span className="register-confirmation">Dont have an account? <span className="register-text" onClick={handleAccountConfirmationClick}>Register</span></span>}
          </div>
        </div>
      </div>
    </div>

  );
}