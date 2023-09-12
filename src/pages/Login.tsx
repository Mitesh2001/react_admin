import axios from 'axios';
import { ChangeEvent, Component, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

class Login extends Component {

    email = "";
    password = "";
    state = {
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8080/api/login', {
            email: this.email,
            password: this.password
        })

        this.setState({
            redirect: true
        })

    }

    render() {

        if (this.state.redirect) {
            return <Navigate to={'/'} />;
        }

        return (
            <main className="form-signin w-100 m-auto">
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Please Login</h1>
                    <div className="form-floating my-2">
                        <input onChange={e => this.email = e.target.value} type="email" className="form-control" placeholder='Email' id="floatingInput" />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating my-2">
                        <input onChange={e => this.password = e.target.value} type="password" className="form-control" placeholder='Password' id="floatingPassword" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
                </form>
            </main>
        )
    }
}

export default Login;