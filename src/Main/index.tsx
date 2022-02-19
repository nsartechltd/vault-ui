import React, { Component } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Amplify } from 'aws-amplify';    
import { Authenticator } from '@aws-amplify/ui-react';

import Accounts from "./Accounts";
import AddAccounts from "./Accounts/Add";
import AuthCallback from "./AuthCallback";
import Home from './Home';
import NavBar from "../Components/NavBar";
import config from "../config";

import '@aws-amplify/ui-react/styles.css';

const { cognito: { userPoolId, userPoolClientId } } = config;

Amplify.configure({
  aws_project_region: "eu-west-2",
  aws_cognito_region: "eu-west-2",
  aws_user_pools_id: userPoolId,
  aws_user_pools_web_client_id: userPoolClientId,
});

const components = {
  Header() {
    return (
      <div style={{padding: 10, alignItems: "center", display: "flex", justifyContent: "center"}}>
        <img src="/vault-logo.png" alt="Vault" width="220" height="100"/>
      </div>
    );
  },
};
 
class Main extends Component {
  render() {
    return (
      <Authenticator components={components} loginMechanisms={['email']} signUpAttributes={['name', 'picture']}>
        {({ signOut, user }) => (
          <BrowserRouter>
            <div>
              <NavBar user={user} signOut={signOut} />

              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/accounts" element={<Accounts userId={user.username} />} />
                  <Route path="/accounts/add" element={<AddAccounts />} />
                  <Route path="/authCallback" element={<AuthCallback userId={user.username} />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        )}
      </Authenticator>
    );
  }
}
 
export default Main;