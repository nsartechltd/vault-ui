import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NumberFormat from '../../NumberFormat';
import config from '../../../config';

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

type Props = {
  displayName: string;
  accountDetails: {
    iban: string;
    swift_bic: string;
    number: string;
    sort_code: string;
  };
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
      accountDetails,
      updateTimestamp,
      providerId,
      accountId,
      trueLayerProviderId,
    } = this.props;
    const { currency, available, current, overdraft } = this.state;

    return (
      <div className="account-card">
        <div className="ac-main">
          <header>
            <h4>{displayName}</h4>
            <h5 className="acc-num">Account Number: {accountDetails.number}</h5>
            <h5 className="sort-code">Sort Code: {accountDetails.sort_code}</h5>
          </header>

          <div className="ac-middle">
            <div>
              <p>
                Current: <NumberFormat value={current} currency={currency} />
              </p>
              <p>
                Available:{' '}
                <NumberFormat value={available} currency={currency} />
              </p>
              <p>
                Overdraft:{' '}
                {overdraft ? (
                  <NumberFormat value={overdraft} currency={currency} />
                ) : (
                  'N/A'
                )}
              </p>
            </div>

            <div>
              <Link
                to={`/accounts/view/${trueLayerProviderId}/transactions/${accountId}`}
                state={{ providerId, accountId }}
              >
                <button>Transactions</button>
              </Link>
            </div>
          </div>

          <footer>
            Last Updated: {new Date(updateTimestamp).toLocaleDateString()}
          </footer>
        </div>
      </div>
    );
  }
}

export default Account;
