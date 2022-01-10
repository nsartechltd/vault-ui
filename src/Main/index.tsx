import React, { Component } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Accounts from "./Accounts";
import AddAccounts from "./Accounts/Add";
import Home from './Home';
import NavBar from "../Components/NavBar";
 
class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/accounts/add" element={<AddAccounts />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default Main;