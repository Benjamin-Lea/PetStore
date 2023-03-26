import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNav extends Component {
    handleLogout() {
        localStorage.removeItem('token');
        window.location.href = '/admin/login'; // redirect to login page
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-secondary ">
                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <div className="container-fluid mr-auto">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-brand">
                                <span className="navbar-brand ">Admin</span>
                            </li>
                            <li class="nav-item">
                                <Link to="/admin/pets" className="btn btn-secondary btn-sm me-auto">Pets</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/admin/merchandise" className="btn btn-secondary btn-sm me-auto">Merchandise</Link>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-secondary btn-sm me-auto" onClick={() => this.handleLogout()}>Logout</button>
                </div>
            </nav>
        );
    }
}

export default AdminNav;
