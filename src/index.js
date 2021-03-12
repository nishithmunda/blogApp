import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Amplify from 'aws-amplify';
//import aws_exports from './aws-exports'

// Amplify.configure(aws_exports)
Amplify.configure({
  'aws_appsync_graphqlEndpoint': '',
  'aws_appsync_region': '',
  'aws_appsync_authenticationType': '', // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id
  Auth: {
      identityPoolId: '',
      region: '',
      identityPoolRegion: '',
      userPoolId: '',
      userPoolWebClientId: '',
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
