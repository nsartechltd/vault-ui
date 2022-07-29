import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import UserProvider from '../../Components/Cards/UserProvider';
import config from '../../config';

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

type UserProviderType = {
  id: number;
  createdAt: string;
  name: string;
  UserId: number;
  providerId: string;
  logoUrl: string;
};

type State = {
  providers: UserProviderType[];
};

type Props = {
  userId?: string;
};

class Accounts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      providers: [],
    };
  }

  async componentDidMount() {
    const { userId } = this.props;
    const response = await fetch(`${vaultApiUrl}/user/${userId}/providers`);
    const body = (await response.json()) as State;

    this.setState({ providers: body.providers });
  }

  render() {
    const { providers } = this.state;

    return (
      <div className="accounts-page">
        <h2>Your Accounts</h2>

        <NavLink to="/accounts/add" className="add-account-btn">
          <input type="button" value="Add Bank Account" />
        </NavLink>

        <div className="accounts-container">
          {providers.map((provider: UserProviderType, index: number) => (
            <UserProvider
              key={index}
              providerId={provider.providerId}
              name={provider.name}
              logo={provider.logoUrl}
              createdAt={provider.createdAt}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Accounts;
