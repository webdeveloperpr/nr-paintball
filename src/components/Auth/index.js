import React from 'react';
import { Authenticator, withFederated } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);


const LoginForm = (props) => {
  return <Authenticator
    // onStateChange={(authState) => console.log('Authentication changed!', authState)}
    federated={{ facebook_app_id: '1362689763902038' }}
    amplifyConfig={awsconfig}
  >
  </Authenticator>
}

export default LoginForm;