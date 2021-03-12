import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Amplify from 'aws-amplify';
//import aws_exports from './aws-exports'

// Amplify.configure(aws_exports)
Amplify.configure({
  'aws_appsync_graphqlEndpoint': 'https://7pmp2ivbbzblvcpmy4vgrnxxpi.appsync-api.us-east-1.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-1',
  'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS', // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id
  Auth: {
      identityPoolId: 'us-east-1:eb1f0a50-ffff-400d-a031-db541ea783ff',
      region: 'us-east-1',
      identityPoolRegion: 'us-east-1',
      userPoolId: 'us-east-1_QV35FoKLd',
      userPoolWebClientId: '2cc6njvf6o12837l1qpscgdoel',
      // cookieStorage: {
      //   domain: 'xxx',
      //   path: 'xxx',
      //   secure: true
      // }

  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
