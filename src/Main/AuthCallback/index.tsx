import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import config from '../../config';

const { vaultApi: { apiUrl: vaultApiUrl } } = config;

type State = {
  status: string;
};
type Props = {
  userId?: string;
};

class AuthCallback extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      status: 'failure'
    };
  }

  async componentDidMount() {
    const { search } = window.location;
    const code = search.split('=')[1];

    const { status } = await fetch(`${vaultApiUrl}/authCallback?code=${code}&userId=${this.props.userId}`);

    if (status === 204) {
      this.setState({ status: 'success' });
    }
  }

  render() {
    const { status } = this.state;

    return status === 'success' ? <Navigate to='/accounts' replace={true} /> : <p>Failed to add account.</p>;
  }
}

export default AuthCallback;