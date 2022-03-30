import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: number;
  name: string;
  logo: string;
  userId?: string;
};

const UserProvider = ({ id, name, logo }: Props): JSX.Element => {
  return (
    <div className="user-provider">
      <img src={logo} alt={name} />
      {/* <h2>{name}</h2> */}
      <Link to={`/accounts/view/${id}`} state={{ providerId: id }}>
        <button>View</button>
      </Link>
    </div>
  );
};

export default UserProvider;
