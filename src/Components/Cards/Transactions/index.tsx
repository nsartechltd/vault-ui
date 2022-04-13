import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';

import NumberFormat from '../../NumberFormat';

type Props = {
  timestamp: string;
  description: string;
  amount: number;
  currency: string;
};

const Transaction = ({
  timestamp,
  description,
  amount,
  currency,
}: Props): JSX.Element => {
  return (
    <div className="transaction-card">
      <div style={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
        <FontAwesomeIcon icon={faMoneyBill1Wave} size="lg" color="#808080" />
      </div>
      <div style={{ width: '50%' }}>
        <div className="trans-desc-full">{description}</div>
        <div className="trans-desc-trim">
          {description.substring(0, 40) + '...'}
        </div>
        <p style={{ fontSize: '12.5px', color: '#808080' }}>
          {new Date(timestamp).toLocaleDateString()}
        </p>
      </div>
      <div style={{ width: '25%' }}>
        <p>
          <NumberFormat currency={currency} value={amount} />
        </p>
      </div>
    </div>
  );
};

export default Transaction;
