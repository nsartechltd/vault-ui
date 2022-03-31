import React, { Component } from 'react';

import AccountCard from '../../../Components/Cards/Account';
import WithRouter from '../../../Components/WithRouter';
import config from '../../../config';

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

type Router = {
  location: {
    state: {
      providerId: number;
      providerName: string;
    };
  };
};

type Props = {
  userId?: string;
  router?: Router | undefined;
};

type Account = {
  update_timestamp: string;
  account_id: string;
  account_type: string;
  display_name: string;
  currency: string;
  account_number: {
    iban: string;
    number: string;
    sort_code: string;
    swift_bic: string;
  };
  provider: {
    provider_id: string;
  };
};

type State = {
  accounts: Account[];
};

class ViewAccounts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      accounts: [],
    };
  }

  async componentDidMount() {
    const { userId, router } = this.props;

    const providerId = router?.location.state.providerId;

    const response = await fetch(
      `${vaultApiUrl}/user/${userId}/provider/${providerId}/accounts`
    );
    const body = await response.json();

    this.setState({ accounts: body.accounts });
  }

  render() {
    const { accounts } = this.state;
    const { userId, router } = this.props;
    const providerName = router?.location.state.providerName;

    return (
      <div className="accounts-view-page">
        <h2>Your {providerName} Accounts</h2>

        <div className="accounts-view-container">
          {accounts.map((account, index) => (
            <AccountCard
              key={index}
              displayName={account.display_name}
              accountType={account.account_type}
              updateTimestamp={account.update_timestamp}
              accountId={account.account_id}
              userId={userId}
              providerId={router?.location.state.providerId}
              trueLayerProviderId={account.provider.provider_id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WithRouter(ViewAccounts);
