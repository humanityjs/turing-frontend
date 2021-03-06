import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createNewUser } from 'api/auth.api';
import { splitUrl } from 'utils/common';
import { actions, AuthContext } from '../context/auth.context';
import style from './auth.module.scss';

export default class SignUpComponent extends Component {
  static contextType = AuthContext;
  state = {
    name: '',
    email: '',
    password: ''
  };

  redirect = splitUrl(window.location.search).redirect;

  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateInput = () => {
    const { name, email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    if (!name.trim || !email.trim() || !regex.test(email) || !password.trim()) {
      return false;
    }
    return true;
  };

  processUser = data => {
    const { dispatch } = this.context;
    dispatch(actions.SET_USER(data.customer));
    window.localStorage.setItem('accessToken', data.accessToken);
    dispatch(actions.SET_TOKEN(data.accessToken));
    // dispatch(actions.SET_AUTH(true));

    if (this.redirect) {
      window.location.href = `/${this.redirect}`;
    } else {
      window.location.href = '/';
    }
  };

  createUser = async () => {
    if (this.validateInput()) {
      try {
        const newUser = await createNewUser(this.state);
        this.processUser(newUser.data);
        Swal.fire({
          type: 'success',
          text: 'Registration Successfull',
          title: 'Success',
          confirmButtonText: 'Okay'
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        type: 'error',
        text: 'Please fill all fields',
        title: 'Invalid input',
        confirmButtonText: 'Okay'
      });
    }
  };

  render() {
    const loginLink = this.redirect
      ? `/login?redirect=${this.redirect}`
      : '/login';
    return (
      <div id="signup-wrapper" className={style.authWrapper}>
        <div className={style.authContent}>
          <h2>Create Account</h2>
          <div className={style.form}>
            <div className={style.field}>
              <label>Name</label>
              <input
                name="name"
                onChange={this.onChange}
                value={this.state.name}
                placeholder="Name"
              />
            </div>
            <div className={style.field}>
              <label>Email</label>
              <input
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                placeholder="Email"
                type="email"
              />
            </div>
            <div className={style.field}>
              <label>Password</label>
              <input
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div className={style.footer}>
            <button
              id="signupButton"
              onClick={this.createUser}
              className={style.btn}
            >
              Create Account
            </button>
            <p className={style.existing}>
              <Link to={loginLink}>I have an account</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
