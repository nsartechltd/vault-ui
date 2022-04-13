import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import config from '../../../config';

type Props = {
  trueLayerId: string;
  title: string;
  logoUrl: string;
};

const {
  trueLayer: { apiUrl: trueLayerApiUrl, clientId, redirectUri },
} = config;

const AuthenticateProvider = ({
  trueLayerId,
  title,
  logoUrl,
}: Props): JSX.Element => {
  return (
    <div className="provider-card">
      <img src={logoUrl} alt={title} />
      <h3>{title}</h3>
      <a
        href={`${trueLayerApiUrl}/?response_type=code&client_id=${clientId}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=${redirectUri}&providers=${trueLayerId}&disable_providers=uk-ob-all`}
      >
        <span>
          <FontAwesomeIcon icon={faCirclePlus} size="2x" />
        </span>
      </a>
    </div>
  );
};

export default AuthenticateProvider;
