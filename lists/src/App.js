// Information from https://reactrouter.com/en/main/start/examples
import * as React from "react";
import {Routes, Route, Outlet, Link } from "react-router-dom";
import Admin from './admin/Admin.js';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand" > Pet Store </Link>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/admin" class="btn btn-secondary">
                  Login
                </Link>
              </li>
            </ul>
        </div>
      </nav>
      <Outlet />
    </div>
    );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
