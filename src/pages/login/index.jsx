import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx@2x.png';

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
        <div className="login-page-decor-top">
          <div className="login-page-decor-top-right">
            <h1 className="login-page-decor-top-text">Design APIs fast,</h1>
            <h1 className="login-page-decor-top-text">Manage content easily</h1>
          </div>
          <div className="login-page-decor-top-left">
            <div className="ball-top">
              <span className="big-box"></span>
            </div>
            <div className="ball-bottom">
              <span className="small-box"></span>
            </div>
          </div>
          {/* <span className="togin-page-decor-top-text">Design APIs fast, Manage content easily</span> */}
        </div>
        <img src={loginImage} alt="" className="login-page-image" />
        <div className="bottom-login-decor">
          <div className="login-img-container">
          </div>
          {/* <div className="bottom-below-image">
            <div className="ball-bottom-top">
              <span className="big-bottom-box"></span>
            </div>
            <div className="ball-bottom-bottom">
              <span className="small-bottom-box"></span>
            </div>
          </div> */}

        </div>

      </div>
      <div className="login-wrapper">
        <h1 className="left-login-title">Login to your CMS+ account</h1>
        <div className="form-container">
          {haveAccount && <form className="form" onSubmit={handleLoginSubmit}>
            <span className="email-text">Email</span>
            <input
              type="username"
              className="form-input"
              value={formData.userName}
              name='userName'
              onChange={handleChange}
            />
            <br />
            <span className="password-text">Password</span>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              name='password'
              onChange={handleChange}
            />
            <br />
            <button className='submit-button'>Login</button>
          </form>}
          {!haveAccount && <form className="form" onSubmit={handleRegisterSubmit}>
            <span className="email-text">Email</span>

            <input
              type="username"
              className="form-input"
              value={registerFormData.userName}
              name='userName'
              onChange={handleRegisterDetailChange}
            />
            <br />
            <span className="password-text">Password</span>

            <input
              type="password"
              className="form-input"
              value={registerFormData.password}
              name='password'
              onChange={handleRegisterDetailChange}
            />
            <br />
            <span className="password-text">Confirm Password</span>

            <input
              type="password"
              className="form-input"
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