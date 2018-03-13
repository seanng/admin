/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import H5 from 'components/fonts/H5';
import {
  validateEmail,
  validateRequired,
  validateMinLength,
} from 'utils/validators';
import messages from './messages';
import { handleInputChange, logIn } from './actions';
import {
  selectFormDomain,
  selectIsFormValid,
  selectLoginErrorMsg,
} from './selectors';
import ValidationErrorMessage from './ValidationErrorMessage';
import Container from './Container';
import FormGroup from './FormGroup';
import ButtonRow from './ButtonRow';
import Button from './Button';
import Card from './Card';

const validateMinLength8 = validateMinLength(8);

// eslint-disable-next-line react/prefer-stateless-function
export class LoginPage extends React.PureComponent {
  handleInputChange = event => {
    const inputKey = event.target.name.toLowerCase();
    const value = event.target.value;
    this.props.handleInputChange(inputKey, value);
  };

  handleLogin = () => {
    const email = this.props.formState.getIn(['login', 'values', 'email']);
    const password = this.props.formState.getIn([
      'login',
      'values',
      'password',
    ]);
    this.props.logIn({ email, password });
  };

  handleValidationCheck = () => !this.props.isFormValid;

  render() {
    return (
      <Container>
        <Card>
          <H5 mb={2.5}>Sign in to continue</H5>
          <Field
            component={FormGroup}
            labelMessage={<FormattedMessage {...messages.email} />}
            validate={[validateRequired, validateEmail]}
            type="text"
            name="email"
          />
          <Field
            component={FormGroup}
            labelMessage={<FormattedMessage {...messages.password} />}
            validate={[validateMinLength8, validateRequired]}
            type="password"
            name="password"
          />
          <ButtonRow>
            <Button
              onClick={this.handleLogin}
              width="100%"
              disabled={this.handleValidationCheck()}
            >
              <FormattedMessage {...messages.signIn} />
            </Button>
          </ButtonRow>
          {this.props.loginErrorMsg &&
            <ValidationErrorMessage big>
              {this.props.loginErrorMsg}
            </ValidationErrorMessage>}
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formState: selectFormDomain(),
  isFormValid: selectIsFormValid(),
  loginErrorMsg: selectLoginErrorMsg(),
});

const mapDispatchToProps = {
  logIn,
  handleInputChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'login',
  })(LoginPage)
);
