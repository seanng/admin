/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoginPage from 'containers/LoginPage';
import LoadingPage from 'components/LoadingPage';
import Navigation from 'components/Navigation';
import Container from 'components/Container';
import { checkAuth, invalidateToken, logout } from './actions';
import { selectUser, selectHasLoaded } from './selectors';
import AppWrapper from './AppWrapper';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {
  componentDidMount() {
    const token = window.localStorage.accessToken || null;
    if (token) {
      return this.props.checkAuth(token);
    }
    return this.props.invalidateToken();
  }

  navigate = path => this.props.router.push(path);

  renderApplication() {
    return (
      <AppWrapper>
        <Navigation
          navigate={this.navigate}
          location={this.props.locationState}
          pathname={this.props.location.pathname}
          logout={this.props.logout}
        />
        <Container>
          {React.Children.toArray(this.props.children)}
        </Container>
      </AppWrapper>
    );
  }

  render() {
    if (!this.props.hasLoaded) {
      return <LoadingPage />;
    }
    return !this.props.user ? <LoginPage /> : this.renderApplication();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    checkAuth: token => dispatch(checkAuth(token)),
    invalidateToken: () => dispatch(invalidateToken()),
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = createStructuredSelector({
  hasLoaded: selectHasLoaded(),
  user: selectUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
