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
import { handleInputChange, logIn } from './actions';
import makeSelectLoginPage from './selectors';
import Container from './Container';
import FormGroup from './FormGroup';
import ButtonRow from './ButtonRow';

// eslint-disable-next-line react/prefer-stateless-function
export class LoginPage extends React.PureComponent {
  handleInputChange = event => {
    const inputKey = event.target.name.toLowerCase();
    const value = event.target.value;
    this.props.handleInputChange(inputKey, value);
  };

  handleLogin = () => {
    const { email, password } = this.props.LoginPage;
    this.props.logIn({ email, password });
  };

  render() {
    const { email, password } = this.props.LoginPage;
    return (
      <Container>
        <Card maxWidth="28rem">
          <H5 mb={2.5}>Sign in to continue</H5>
          <FormGroup
            label="Email"
            inputType="text"
            inputValue={email}
            onInputChange={this.handleInputChange}
          />
          <FormGroup
            label="Password"
            inputType="password"
            inputValue={password}
            onInputChange={this.handleInputChange}
          />
          <ButtonRow>
            <Button bgColor={colors.bsSuccess} textColor={colors.white} mr={1}>
              Register
            </Button>
            <Button
              bgColor={colors.bsPrimary}
              textColor={colors.white}
              onClick={this.handleLogin}
            >
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
    logIn: info => dispatch(logIn(info)),
    handleInputChange: (key, value) => dispatch(handleInputChange(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
