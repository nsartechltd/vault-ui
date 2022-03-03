import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../../../config';

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

type Props = {
  displayName: string;
  accountType: string;
  updateTimestamp: string;
  accountId: string;
  userId?: string;
  providerId?: number;
  trueLayerProviderId: string;
};

type State = {
  currency: string;
  available: number | null;
  current: number | null;
  overdraft: number | null;
};

class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currency: '',
      available: null,
      current: null,
      overdraft: null,
    };
  }

  async componentDidMount() {
    const { accountId, userId, providerId } = this.props;

    const response = await fetch(
      `${vaultApiUrl}/user/${userId}/provider/${providerId}/account/${accountId}/balance`
    );
    const body = await response.json();

    this.setState({ ...body });
  }

  render() {
    const {
      displayName,
      accountType,
      updateTimestamp,
      providerId,
      accountId,
      trueLayerProviderId,
    } = this.props;
    const { currency, available, current, overdraft } = this.state;

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{displayName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{accountType}</h6>
          <p className="card-text">Currency: {currency}</p>
          <p className="card-text">Available: {available}</p>
          <p className="card-text">Current: {current}</p>
          <p className="card-text">Overdraft: {overdraft}</p>
          <Link
            to={`/accounts/view/${trueLayerProviderId}/transactions`}
            state={{ providerId, accountId }}
            className="card-link"
          >
            Transactions
          </Link>

          <div className="card-footer text-muted">{updateTimestamp}</div>
        </div>
      </div>
    );
  }
}

export default Account;
