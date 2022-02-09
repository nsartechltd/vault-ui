import React, { Component } from 'react';

import config from '../../../config';

console.log('CONFIG LOADED IN ACCOUNTS ADD PAGE: ', config);

type Provider = {
  provider_id: string;
  display_name: string;
  country: string;
  logo_url: string;
  scopes: string[];
};

type State = {
  providers: Provider[];
};

type Props = {};

const {
  trueLayer: {
    apiUrl: trueLayerApiUrl,
    clientId,
    redirectUri
  },
  vaultApi: {
    apiUrl: vaultApiUrl
  }
} = config;

class AddAccounts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      providers: []
    };
  }

  async componentDidMount() {
    const response = await fetch(`${vaultApiUrl}/providers`);
    const body = await response.json() as State;

    this.setState({ providers: body.providers });
  }

  render() {
    const { providers } = this.state;
  
    return (
      <>
      <h2>Add Account</h2>

      <br />

      <div className="list-group">
        {providers.map((provider: Provider, index: number) =>
          <a
            key={index}
            href={`${trueLayerApiUrl}/?response_type=code&client_id=${clientId}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=${redirectUri}&providers=${provider.provider_id}&disable_providers=uk-ob-all`}
            className="list-group-item list-group-item-action">{provider.display_name}
          </a>
        )}
      </div>
    </>
    );
  }
}

export default AddAccounts;