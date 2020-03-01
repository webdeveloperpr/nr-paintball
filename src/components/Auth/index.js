import React from 'react';
import { Auth, Hub } from 'aws-amplify';

class Authenticate extends React.Component {
  state = { user: null, customState: null };

  componentDidMount() {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
        case "customOAuthState":
          this.setState({ customState: data });
          break;
        default:
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>Open Facebook</button>
        <button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>Open Google</button>
        <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
        {/* <button onClick={() => Auth.signOut()}>Sign Out {user.getUsername()}</button> */}
      </div>
    );
  }
}

export default Authenticate;