import React from 'react';
import Authenticator from 'aws-amplify-react/lib/Auth/Authenticator';
import awsconfig from '../../aws-exports';

const LoginForm = props => {
  return <Authenticator
    // onStateChange={(...props) => console.log('Authentication changed!', ...props)}
    federated={props.federated}
    amplifyConfig={awsconfig}
    errorMessage={(err) => console.log(err)}
  >
  </Authenticator>
}

export default LoginForm;
