const env = process.env.NODE_ENV || 'development';

const config: any = {
  development: {
    vaultApi: {
      apiUrl: 'http://localhost:3001/dev/api'
    },
    trueLayer: {
      apiUrl: 'https://auth.truelayer-sandbox.com',
      clientId: process.env.REACT_APP_TRUE_LAYER_CLIENT_ID,
      redirectUri: 'http://localhost:3001/dev/api/authCallback'
    }
  },
  production: {
    vaultApi: {
      apiUrl: 'http://localhost:3001/dev/api'
    },
    trueLayer: {
      apiUrl: 'https://auth.truelayer.com',
      clientId: process.env.REACT_APP_TRUE_LAYER_CLIENT_ID,
      redirectUri: 'http://localhost:3001/dev/api/authCallback'
    }
  },
};

export default config[env];