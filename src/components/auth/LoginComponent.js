import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from 'api/auth.api';
import { actions, AuthContext } from '../context/auth.context';
import { splitUrl } from 'utils/common';
import style from './auth.module.scss';

export default class LoginComponent extends Component {
  static contextType = AuthContext;
  state = {
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
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    if (!email.trim() || !regex.test(email) || !password.trim()) {
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
    }
  };

  loginUser = async () => {
    if (this.validateInput()) {
      try {
        const user = await login(this.state);
        this.processUser(user.data);
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
    const signUpLink = this.redirect
      ? `/create-account?redirect=${this.redirect}`
      : '/create-account';
    return (
      <div className={style.authWrapper}>
        <div className={style.authContent}>
          <h2>Login</h2>
          <div className={style.form}>
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
            <button onClick={this.loginUser} className={style.btn}>
              Login
            </button>
            <p className={style.existing}>
              <Link to={signUpLink}>Create account</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
