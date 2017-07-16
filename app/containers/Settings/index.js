/*
 *
 * Settings
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectSettings from './selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class Settings extends React.PureComponent {
  render() {
    return <div>this is the settings component.</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  Settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
