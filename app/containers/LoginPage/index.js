/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import colors from 'themes/colors';
import Card from 'components/Card';
import Button from 'components/Button';
import H5 from 'components/fonts/H5';
import makeSelectLoginPage from './selectors';
import Container from './Container';
import FormGroup from './FormGroup';
import ButtonRow from './ButtonRow';

// eslint-disable-next-line react/prefer-stateless-function
export class LoginPage extends React.PureComponent {
  render() {
    return (
      <Container>
        <Card width={28}>
          <H5 mb={2.5}>Sign in to continue</H5>
          <FormGroup label="Username" inputType="text" />
          <FormGroup label="Password" inputType="password" />
          <ButtonRow>
            <Button bgColor={colors.bsSuccess} textColor={colors.white} mr={1}>
              Register
            </Button>
            <Button bgColor={colors.bsPrimary} textColor={colors.white}>
              Sign In
            </Button>
          </ButtonRow>
        </Card>
      </Container>
    );
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
