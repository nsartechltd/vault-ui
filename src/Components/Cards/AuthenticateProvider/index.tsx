import React from 'react';

type Props = {
  trueLayerId: string
  title: string
}

const AuthenticateProvider = ({ trueLayerId, title }: Props): JSX.Element => {
  return (
    <div>
      <h1>{title}</h1>
      <a href={`https://auth.truelayer.com/?response_type=code&client_id=nsartechltd12466063-d20ff0&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:3000/api/trueLayer/redirect&providers=${trueLayerId}&disable_providers=uk-ob-all`}>
        <input type="button" value="Authenticate Provider" />
      </a>
    </div>
  );
};

export default AuthenticateProvider;