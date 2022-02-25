import React, { Component } from 'react';

import WithRouter from '../../../Components/WithRouter';
import config from '../../../config';

const { vaultApi: { apiUrl: vaultApiUrl } } = config;

type Props = {
  userId?: string;
  router?: any;
};

type State = {
  transactions: any;
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

    const { accountId, providerId } = router.location.state;

    const response = await fetch(`${vaultApiUrl}/user/${userId}/provider/${providerId}/account/${accountId}/transactions`);
    const body = await response.json();

    this.setState({ ...body });
  }

  render() {
    const { transactions } = this.state;
    
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Merchant</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t: any) => 
            <tr>
              <th scope="row">{t.transaction_id}</th>
              <td>{t.merchant_name}</td>
              <td>{t.description}</td>
              <td>{t.currency} {t.amount}</td>
              <td>{t.timestamp}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default WithRouter(AccountTransactions);