import React, { MouseEventHandler } from 'react';
import {
  NavLink,
} from "react-router-dom";

type Props = {
  user: any;
  signOut: MouseEventHandler<HTMLButtonElement>;
};

const NavBar = (props: Props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand" >
          <NavLink to="/">
            <img src="/vault-logo.png" alt="Vault" width="110" height="50"/>
          </NavLink>
        </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link">
                <NavLink to="/accounts">Accounts</NavLink>
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-center align-items-center justify-content-evenly">
            <div className="p-2 justify-content-center align-items-center justify-content-evenly"><p className="justify-content-center align-items-center">Hello, {props.user.attributes.name}</p></div>
            <div className="p-2"><button className="btn btn-secondary" onClick={props.signOut}>Sign out</button></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;