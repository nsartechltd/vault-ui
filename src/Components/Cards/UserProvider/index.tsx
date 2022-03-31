import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: number;
  name: string;
  logo: string;
  createdAt: string;
};

const UserProvider = ({ id, name, logo, createdAt }: Props): JSX.Element => {
  return (
    <div className="user-provider">
      <img src={logo} alt={name} />
      <Link
        to={`/accounts/view/${id}`}
        state={{ providerId: id, providerName: name }}
      >
        <button>View</button>
      </Link>

      <footer>Added: {new Date(createdAt).toLocaleDateString()}</footer>
    </div>
  );
};

export default UserProvider;
