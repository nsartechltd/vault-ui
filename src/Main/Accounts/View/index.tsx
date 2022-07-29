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

/**
 * {
      "id": 1,
      "type": "account",
      "accountId": "56c7b029e0f8ec5a2334fb0ffc2fface",
      "createdAt": "2022-07-29T19:30:47.000Z",
      "updatedAt": "2022-07-29T19:30:47.000Z",
      "TokenId": 2,
      "Account": {
        "id": 1,
        "type": "TRANSACTION",
        "name": "TRANSACTION ACCOUNT 1",
        "currency": "GBP",
        "accountNumber": "10000000",
        "sortCode": "01-21-31",
        "iban": "GB08CLRB04066800003435",
        "createdAt": "2022-07-29T19:30:47.000Z",
        "updatedAt": "2022-07-29T19:30:47.000Z",
        "assetId": 1,
        "AssetId": 1
      }
    }
 */

type Account = {
  id: number;
  type: 'account' | 'card';
  accountId: string;
  createdAt: string;
  updatedAt: string;
  Account: {
    type: string;
    name: string;
    currency: string;
    accountNumber: string;
    sortCode: string;
    iban: string;
    createdAt: string;
    updatedAt: string;
  }
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
          {accounts.map(({ accountId, Account: account }, index) => (
            <AccountCard
              key={index}
              displayName={account.name}
              accountDetails={{ iban: account.iban, number: account.accountNumber, sort_code: account.sortCode, swift_bic:  }}
              updateTimestamp={account.updatedAt}
              accountId={accountId}
              userId={userId}
              providerId={router?.location.state.providerId}
              // trueLayerProviderId={account.provider.provider_id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WithRouter(ViewAccounts);
