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
import {
  checkAuth,
  invalidateToken,
  logout,
  setBottomNavItems,
} from './actions';
import { selectUser, selectBottomNavItems, selectHasLoaded } from './selectors';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {
  componentDidMount() {
    const token = window.localStorage.accessToken || null;
    if (token) {
      return this.props.checkAuth(token);
    }
    return this.props.invalidateToken();
  }

  viewDashboard = () => {
    this.props.router.push('/');
    this.props.setBottomNavItems('dashboard');
  };

  viewAccount = () => {
    this.props.router.push('/hotelprofile');
    this.props.setBottomNavItems('account');
  };

  renderApplication() {
    return (
      <div>
        <Navigation
          location={this.props.locationState}
          viewDashboard={this.viewDashboard}
          viewAccount={this.viewAccount}
          bottomNavItems={this.props.bottomNavItems}
          pathname={this.props.location.pathname}
          logout={this.props.logout}
        />
        <Container>
          {React.Children.toArray(this.props.children)}
        </Container>
      </div>
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
    setBottomNavItems: view => dispatch(setBottomNavItems(view)),
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = createStructuredSelector({
  hasLoaded: selectHasLoaded(),
  user: selectUser(),
  bottomNavItems: selectBottomNavItems(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
