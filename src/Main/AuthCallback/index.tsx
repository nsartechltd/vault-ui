import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import config from '../../config';

const {
  vaultApi: { apiUrl: vaultApiUrl },
} = config;

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
      status: 'pending',
    };
  }

  async componentDidMount() {
    const { search } = window.location;
    const code = search.split('=')[1];

    const { status } = await fetch(
      `${vaultApiUrl}/authCallback?code=${code}&userId=${this.props.userId}`
    );

    if (status === 204) {
      this.setState({ status: 'success' });
    }
    else {
      this.setState({ status: 'failure' })
    }
  }

  render() {
    const { status } = this.state;

    if (status === 'failure') {
      return (<p>Failed to add account.</p>);
    }

    if (status === 'pending') {
      return (<p>Loading...</p>);
    }

    return (
      <Navigate to="/accounts" replace={true} />
    );
  }
}

export default AuthCallback;
