import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import config from '../../config';

const { vaultApi: { apiUrl: vaultApiUrl } } = config;

type State = {};
type Props = {
  userId?: string;
};

class AuthCallback extends Component<Props, State> {
  async componentDidMount() {
    const { search } = window.location;
    const code = search.split('=')[1];

    await fetch(`${vaultApiUrl}/authCallback?code=${code}&userId=${this.props.userId}`);
  }

  render() {
    return (
      <Navigate to='/accounts' replace={true} />
    );
  }
}

export default AuthCallback;