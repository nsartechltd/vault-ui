import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Accounts from './Accounts';
import AddAccounts from './Accounts/Add';
import ViewAccounts from './Accounts/View';
import AccountTransactions from './Accounts/Transactions';
import AuthCallback from './AuthCallback';
import Dashboard from './Dashboard';
import NavBar from '../Components/NavBar';
import config from '../config';

import '@aws-amplify/ui-react/styles.css';

const {
  cognito: { userPoolId, userPoolClientId },
} = config;

Amplify.configure({
  aws_project_region: 'eu-west-2',
  aws_cognito_region: 'eu-west-2',
  aws_user_pools_id: userPoolId,
  aws_user_pools_web_client_id: userPoolClientId,
});

const components = {
  Header() {
    return (
      <div
        style={{
          padding: 10,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src="/vault-logo.png" alt="Vault" width="220" height="100" />
      </div>
    );
  },
};

type Props = Record<string, unknown>;
type State = {
  toggled: boolean;
};

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggled: false,
    };

    this.setToggled = this.setToggled.bind(this);
  }

  setToggled(value: boolean) {
    this.setState({
      toggled: value,
    });
  }

  render() {
    const { toggled } = this.state;

    return (
      <Authenticator
        components={components}
        loginMechanisms={['email']}
        signUpAttributes={['name', 'picture']}
      >
        {({ signOut, user }) => (
          <BrowserRouter>
            <div className={`app${toggled ? ' toggled' : ''}`}>
              <NavBar
                user={user}
                signOut={signOut}
                toggled={toggled}
                onToggle={this.setToggled}
              />

              <div className="main">
                <div
                  className="btn-toggle"
                  onClick={() => this.setToggled(true)}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>

                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/accounts"
                    element={<Accounts userId={user.username} />}
                  />
                  <Route path="/accounts/add" element={<AddAccounts />} />
                  <Route
                    path="/accounts/view/:providerId"
                    element={<ViewAccounts userId={user.username} />}
                  />
                  <Route
                    path="/accounts/view/:providerId/transactions/:accountId"
                    element={<AccountTransactions userId={user.username} />}
                  />
                  <Route
                    path="/authCallback"
                    element={<AuthCallback userId={user.username} />}
                  />
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
