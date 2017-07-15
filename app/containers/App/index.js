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
import { createStructuredSelector, createSelector } from 'reselect';
import LoginPage from 'containers/LoginPage';
import LoadingPage from 'components/LoadingPage';
import { checkAuth, invalidateToken } from './actions';
import { makeSelectGlobal, selectUser } from './selectors';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {
  componentDidMount() {
    const token = window.localStorage.accessToken || null;
    if (token) {
      return this.props.checkAuth(token);
    }
    return this.props.invalidateToken();
  }

  renderApplication() {
    return (
      <div>
        {React.Children.toArray(this.props.children)}
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
  };
}

const mapStateToProps = createStructuredSelector({
  hasLoaded: createSelector(makeSelectGlobal, substate =>
    substate.get('hasLoaded')
  ),
  user: selectUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
