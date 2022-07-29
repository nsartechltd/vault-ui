import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import config from '../../../config';

type Props = {
  trueLayerId: string;
  title: string;
  logoUrl: string;
  userId?: string;
};

const {
  trueLayer: { apiUrl: trueLayerApiUrl, clientId, redirectUri },
  vaultApi: { apiUrl: vaultApiUrl }
} = config;

class AuthenticateProvider extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  async handleAuthClick() {
    const { logoUrl, trueLayerId, userId } = this.props;

    await fetch(`${vaultApiUrl}/provider/authenticate`, {
      method: 'POST',
      body: JSON.stringify({ logoUrl, trueLayerId, userId })
    });

    window.location.replace(`${trueLayerApiUrl}/?response_type=code&client_id=${clientId}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=${redirectUri}&providers=${trueLayerId}&disable_providers=uk-ob-all`);
  }

  render() {
    const { title, logoUrl } = this.props;

    return (
      <div className="provider-card">
        <img src={logoUrl} alt={title} />
        <h3>{title}</h3>
        <div
          onClick={this.handleAuthClick}
        >
          <span>
            <FontAwesomeIcon icon={faCirclePlus} size="2x" />
          </span>
        </div>
      </div>
    );
  }
}

export default AuthenticateProvider;
