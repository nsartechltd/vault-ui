import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import UserProvider from '../../Components/Cards/UserProvider';
import config from '../../config';

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

type UserProviderType = {
  id: number;
  UserId: number;
  ProviderId: number;
  Provider: {
    id: number;
    name: string;
    providerId: string;
    country: string;
    logoUrl: string;
    createdAt: string;
    updatedAt: string;
  };
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
      <>
        <h2>Your Accounts</h2>

        <br />

        <NavLink to="/accounts/add">
          <input type="button" value="Add Bank Account" />
        </NavLink>

        <br />

        <div className="accounts-container">
          {providers.map((provider: UserProviderType, index: number) => (
            <UserProvider
              key={index}
              id={provider.Provider.id}
              name={provider.Provider.name}
              logo={provider.Provider.logoUrl}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Accounts;
