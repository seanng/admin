/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class LoginPage extends React.PureComponent {
  render() {
    return <div>this is the login page.</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  LoginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
