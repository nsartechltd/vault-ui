import React, { Component } from 'react';

import Transaction from '../../../Components/Cards/Transactions';
import WithRouter from '../../../Components/WithRouter';
import config from '../../../config';

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

type Router = {
  location: {
    state: {
      providerId: number;
      accountId: string;
    };
  };
};

type Transaction = {
  transaction_id: string;
  merchant_name: string;
  description: string;
  currency: string;
  amount: number;
  timestamp: string;
  transaction_classification: string[];
};

type Props = {
  userId?: string;
  router?: Router | undefined;
};

type State = {
  transactions: Transaction[];
};

class AccountTransactions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      transactions: [],
    };
  }

  async componentDidMount() {
    const { userId, router } = this.props;

    const providerId = router?.location.state.providerId;
    const accountId = router?.location.state.accountId;

    const response = await fetch(
      `${vaultApiUrl}/user/${userId}/provider/${providerId}/account/${accountId}/transactions`
    );
    const body = await response.json();

    this.setState({ ...body });
  }

  render() {
    const { transactions } = this.state;

    return (
      <div className="transactions-page">
        <h2>Transactions</h2>

        <br />

        <div className="transactions-container">
          {transactions.map((transaction: Transaction, index: number) => (
            <Transaction
              key={index}
              timestamp={transaction.timestamp}
              description={transaction.description}
              amount={transaction.amount}
              currency={transaction.currency}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WithRouter(AccountTransactions);
