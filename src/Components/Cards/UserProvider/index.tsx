import React from 'react';

type Props = {
  name: string;
  logo: string;
}

const UserProvider = ({ name, logo }: Props): JSX.Element => {
  return (
    <div className="card" style={{width: '18rem'}}>
      <img src={logo} className="card-img-top" alt={name} height={50} width={50} />
      <div className="card-body">
        <p className="card-text"></p>
        <a href="/" className="d-flex justify-content-center btn btn-primary">View</a>
      </div>
    </div>
  );
};

export default UserProvider;