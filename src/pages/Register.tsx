import React, { Component, SyntheticEvent } from 'react';
import '../Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class Register extends Component {

  first_name = "";
  last_name = "";
  email = "";
  password = "";
  password_confirm = "";
  state = {
    redirect: false
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.post('register', {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirm: this.password_confirm,
    })

    this.setState({
      redirect: true
    })
  }

  render() {

    if (this.state.redirect) {
      return <Navigate to={'/login'} />;
    }

    return (
      <main className="form-signin w-100 m-auto">
        <form onSubmit={this.submit}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <div className="form-floating my-2">
            <input onChange={e => this.first_name = e.target.value} type="text" className="form-control" placeholder='First Name' id="floatingInput" />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div className="form-floating my-2">
            <input onChange={e => this.last_name = e.target.value} type="text" className="form-control" placeholder='Last Name' id="floatingInput" />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div className="form-floating my-2">
            <input onChange={e => this.email = e.target.value} type="email" className="form-control" placeholder='Email' id="floatingInput" />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating my-2">
            <input onChange={e => this.password = e.target.value} type="password" className="form-control" placeholder='Password' id="floatingPassword" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating my-2">
            <input onChange={e => this.password_confirm = e.target.value} type="password" className="form-control" placeholder='Confirm Password' id="floatingPassword" />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
        </form>
      </main>
    )
  }
}
