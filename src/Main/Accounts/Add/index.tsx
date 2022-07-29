import React, { Component } from 'react';

import AuthenticateProvider from '../../../Components/Cards/AuthenticateProvider';
import config from '../../../config';

type Provider = {
  provider_id: string;
  display_name: string;
  country: string;
  logo_url: string;
  scopes: string[];
};

type Props = {
  userId?: string;
}

type State = {
  providers: Provider[];
};

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

class AddAccounts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      providers: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(`${vaultApiUrl}/providers`);
    const body = (await response.json()) as State;

    this.setState({ providers: body.providers });
  }

  render() {
    const { providers } = this.state;
    const { userId } = this.props;

    return (
      <div className="add-provider-page">
        <h2>Add Provider</h2>

        <br />

        <div className="add-provider-container">
          {providers.map((provider: Provider, index: number) => (
            <AuthenticateProvider
              key={index}
              trueLayerId={provider.provider_id}
              title={provider.display_name}
              logoUrl={provider.logo_url}
              userId={userId}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AddAccounts;
