import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storeCurrentUser } from '../auth';
import './Register.css';


export const Register = props => {
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createFirstName, setCreateFirstName] = useState('');
  const [createLastName, setCreateLastName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const BASE = 'http://localhost:8080/api'

  let navigate = useNavigate();

  const registerUser = async () => {
    const data = await axios.post(`${BASE}/users/register`, {
      username: createUsername,
      password: createPassword,
      firstName: createFirstName,
      lastName: createLastName,
      email: createEmail,
    });
    storeCurrentUser(data);
    props.setIsLoggedIn(data.data.user);
    props.setIsAdmin(data.data.user.isAdmin);
    return data;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    registerUser();
    localStorage.removeItem('guestId');
    navigate('/');
  };

  return (
    <div id="register-page">
      <div id="register-form">
        <h2>Please Sign Up</h2>
        <form className="input-container" onSubmit={handleSubmit}>
          <div className="form-input">
            <label>Create Username</label>
            <input
              className="input-bar"
              type="text"
              placeholder="Create Username"
              value={createUsername}
              onChange={event => {
                setCreateUsername(event.target.value);
              }}
              minLength={7}
            ></input>
          </div>
          <div className="form-input">
            <label>Create Password</label>
            <input
              className="input-bar"
              type="text"
              placeholder="Create Password"
              value={createPassword}
              onChange={event => {
                setCreatePassword(event.target.value);
              }}
              minLength={7}
            ></input>
          </div>
          <div className="form-input">
            <label>Confirm Password</label>
            <input
              className="input-bar"
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={event => {
                setConfirmPassword(event.target.value);
              }}
              minLength={7}
            ></input>
          </div>
          <div className="form-input">
            <label>First Name</label>
            <input
              className="input-bar"
              type="text"
              placeholder="First Name"
              value={createFirstName}
              onChange={event => {
                setCreateFirstName(event.target.value);
              }}
            ></input>
          </div>
          <div className="form-input">
            <label>Last Name</label>
            <input
              className="input-bar"
              type="text"
              placeholder="Last Name"
              value={createLastName}
              onChange={event => {
                setCreateLastName(event.target.value);
              }}
            ></input>
          </div>
          <div className="form-input">
            <label>Email</label>
            <input
              className="input-bar"
              type="text"
              placeholder="Email"
              value={createEmail}
              onChange={event => {
                setCreateEmail(event.target.value);
              }}
              minLength={7}
            ></input>
          </div>
          <div className="button-container">
            <button id="register-button" type="submit">
              REGISTER
            </button>
          </div>
        </form>
        <br />
        <Link to="/login">
          Already a registered user? Click here to sign in!
        </Link>
      </div>
    </div>
  );
};
