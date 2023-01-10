import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  trueLayerId: string;
  name: string;
  logo: string;
  createdAt: string;
};

const UserProvider = ({ trueLayerId, name, logo, createdAt }: Props): JSX.Element => {
  return (
    <div className="user-provider">
      <img src={logo} alt={name} />
      <Link
        to={`/accounts/view/${trueLayerId}`}
        state={{ trueLayerId, providerName: name }}
      >
        <button>View</button>
      </Link>

      <footer>Added: {new Date(createdAt).toLocaleDateString()}</footer>
    </div>
  );
};

export default UserProvider;
