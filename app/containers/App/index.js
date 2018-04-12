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
import { FormattedMessage } from 'react-intl';
import LoginPage from 'containers/LoginPage';
import LoadingPage from 'components/LoadingPage';
import Navigation from 'components/Navigation';
import Container from 'components/Container';
import { checkAuth, invalidateToken, logout } from './actions';
import { selectUser, selectHasLoaded } from './selectors';
import AppWrapper from './AppWrapper';
import SubNavContainer from './SubNavContainer';
import SubNavButton from './SubNavButton';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {
  componentDidMount() {
    const token = window.localStorage.accessToken || null;
    if (token) {
      return this.props.checkAuth(token);
    }
    return this.props.invalidateToken();
  }

  pathsWithSubNav = [
    '/hotelprofile',
    '/teammanagement',
    '/earnings',
    '/settings',
  ];

  navigate = path => this.props.router.push(path);

  shouldRenderSubNav = () => {
    const { pathname } = this.props.location;
    /* eslint-disable no-restricted-syntax */
    for (const path of this.pathsWithSubNav) {
      if (pathname.indexOf(path) !== -1) {
        return true;
      }
    }
    return false;
  };

  renderApplication() {
    return (
      <AppWrapper>
        <Navigation
          navigate={this.navigate}
          location={this.props.locationState}
          pathname={this.props.location.pathname}
          logout={this.props.logout}
        />
        {this.shouldRenderSubNav() && (
          <SubNavContainer>
            {this.pathsWithSubNav.map((path, i) => (
              <SubNavButton
                key={path}
                first={i === 0}
                active={this.props.location.pathname.indexOf(path) !== -1}
                onClick={() => this.navigate(path)}
              >
                <FormattedMessage {...messages[path]} />
              </SubNavButton>
            ))}
          </SubNavContainer>
        )}
        <Container>{React.Children.toArray(this.props.children)}</Container>
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
