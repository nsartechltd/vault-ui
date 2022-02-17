const env = process.env.REACT_APP_ENVIRONMENT || 'development';

const config: any = {
  development: {
    vaultApi: {
      apiUrl: process.env.REACT_APP_VAULT_API_URL,
    },
    trueLayer: {
      apiUrl: 'https://auth.truelayer-sandbox.com',
      clientId: process.env.REACT_APP_TRUE_LAYER_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_VAULT_API_URL}/authCallback`
    },
    cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    }
  },
  production: {
    vaultApi: {
      apiUrl: process.env.REACT_APP_VAULT_API_URL,
    },
    trueLayer: {
      apiUrl: 'https://auth.truelayer.com',
      clientId: process.env.REACT_APP_TRUE_LAYER_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_VAULT_API_URL}/authCallback`
    },
    cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    }
  },
};

export default config[env];