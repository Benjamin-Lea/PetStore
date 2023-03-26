import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminLogin.css';

class AdminLogin extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    componentDidMount() {
        let token = localStorage.getItem('token');
        fetch('/authorized', {
            headers: {
                'token': token
            }
        }).then(response => response.json())
            .then((data) => {
                if (data.status == true) {
                    window.location.href = '/admin/pets';
                }
            }).catch((err) => { console.log(err); });
    }

    handleSubmit(e) {
        // const pwd = bcrypt.hashSync(this.state.password, salt);
        e.preventDefault();
        fetch('/login', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        }).then(response => response.json())
            .then((data) => {
                if (data.status) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/admin/pets';
                }
            }).catch((err) => { console.log(err); });
        this.setState({
            username: '',
            password: '',
        });
    }

    render() {
        return (
            <div className="container">
                <div id="loginCard" className="card">
                    <div className="card-body">
                        <h2 id="loginCardTitle" className="card-title text-center">Admin Login</h2>
                        <p> user name =  admin  password = a </p>
                        <form>
                            <div className="form-group">
                                <label id="loginLabel" htmlFor="username">User Name</label>
                                <input type="text" autoComplete="off" name="username" value={this.state.username} onChange={this.onChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label id="loginLabel" htmlFor="password">Password</label>
                                <input type="password" autoComplete="off" name="password" value={this.state.password} onChange={this.onChange} className="form-control" required />
                            </div>
                            <button id="loginButton" className="btn btn-primary" disabled={this.state.username == '' && this.state.password == ''} onClick={(e) => this.handleSubmit(e)}> Login </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLogin;
