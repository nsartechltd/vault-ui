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
    <div className="card" style={{ width: '18rem' }}>
      <img
        src={logo}
        className="card-img-top"
        alt={name}
        height={50}
        width={50}
      />
      <div className="card-body d-flex justify-content-center">
        <h5 className="card-text">{name}</h5>
        <Link to="/accounts/view" state={{ providerId: id }}>
          <input type="button" className="btn btn-primary" value="View" />
        </Link>
      </div>
    </div>
  );
};

export default UserProvider;
