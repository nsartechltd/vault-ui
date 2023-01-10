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
      trueLayerId: number;
      providerName: string;
    };
  };
};

type Props = {
  userId?: string;
  router?: Router | undefined;
};

type Account = {
  id: number;
  type: 'account' | 'card';
  accountId: string;
  createdAt: string;
  updatedAt: string;
  trueLayerId: string;
  ProviderId: number;
  Account: {
    type: string;
    name: string;
    currency: string;
    accountNumber: string;
    sortCode: string;
    iban: string;
    bic: string;
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

    const trueLayerId = router?.location.state.trueLayerId;

    const response = await fetch(
      `${vaultApiUrl}/user/${userId}/provider/${trueLayerId}/accounts`
    );
    const body = await response.json();

    this.setState({ accounts: body.accounts });
  }

  render() {
    const { accounts } = this.state;
    const { userId, router } = this.props;
    const providerName = router?.location.state.providerName;

    console.log("ACCOUNTS: ", accounts)

    return (
      <div className="accounts-view-page">
        <h2>Your {providerName} Accounts</h2>

        <div className="accounts-view-container">
          {accounts.map(({ trueLayerId, accountId, Account: account }, index) => (
            <AccountCard
              key={index}
              displayName={account.name}
              accountDetails={{ iban: account.iban, number: account.accountNumber, sort_code: account.sortCode, swift_bic: account.bic }}
              updateTimestamp={account.updatedAt}
              accountId={accountId}
              userId={userId}
              trueLayerId={trueLayerId}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WithRouter(ViewAccounts);
