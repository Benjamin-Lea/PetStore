// Information from https://reactrouter.com/en/main/start/examples
import * as React from "react";
import {Routes, Route, Outlet, Link } from "react-router-dom";
import Admin from './admin/Admin.js';
import Home from './home/Home.js';
import Catalog from './Catalog/Catalog.js';
import Mechandise from './admin/Merchandise.js';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/Mechandise" element={<Mechandise />} />
          <Route path="/catalog" element={<Catalog />} />
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
          <div>
          <Link to="/" class="navbar-brand" > Pet Store </Link>
          <Link to="/catalog" class="btn btn-secondary"> Catalog </Link>
          <Link to="/admin/Mechandise"> Admin2 </Link>
          </div>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/admin" class="btn btn-secondary"> Login </Link>
              </li>
            </ul>
        </div>
      </nav>
      <Outlet />
    </div>
    );
}
