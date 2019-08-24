import React, { createContext, Component } from 'react';

export const { Provider: UserProvider, Consumer: UserConsumer } = createContext();

class userContext extends Component {
  state = {
    user: {
      username: 'yagnesh',
      password: 'password',
    },
    onChangeUser: usr => this.setState({ user: usr }),
  };
  render() {
    const { children } = this.props;
    return <UserProvider value={this.state}>{children}</UserProvider>;
  }
}

userContext.propTypes = {};

export default userContext;
