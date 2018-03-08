import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import colors from 'themes/colors';
import { reduxForm, Field } from 'redux-form/immutable';
import InputFieldRow from './InputFieldRow';
import messages from './messages';

const Card = styled.div`
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  width: 748px;
  background-color: ${colors.white};
  padding: 1px 10px 30px 10px;
`;

function DetailsForm() {
  return (
    <Card>
      <Field
        name="firstName"
        component={InputFieldRow}
        placeholder="eg. John"
        labelMessage={<FormattedMessage {...messages.firstName} />}
        width="548px"
        type="text"
        // value={this.props.userTemporary.get('firstName')}
        // onChange={this.handleInputChange}
      />
      <Field
        name="lastName"
        component={InputFieldRow}
        placeholder="eg. Doe"
        labelMessage={<FormattedMessage {...messages.lastName} />}
        width="548px"
        type="text"
        // value={this.props.userTemporary.get('firstName')}
        // onChange={this.handleInputChange}
      />
      <Field
        name="email"
        component={InputFieldRow}
        placeholder="eg. johndoe@email.com"
        labelMessage={<FormattedMessage {...messages.email} />}
        width="548px"
        type="text"
        // value={this.props.userTemporary.get('firstName')}
        // onChange={this.handleInputChange}
      />
      <Field
        name="phoneNumber"
        component={InputFieldRow}
        placeholder="eg. 6464 6464"
        labelMessage={<FormattedMessage {...messages.contactNumber} />}
        width="548px"
        type="text"
        // value={this.props.userTemporary.get('firstName')}
        // onChange={this.handleInputChange}
      />
      <Field
        name="oldPassword"
        component={InputFieldRow}
        placeholder="Enter to confirm changes"
        labelMessage={<FormattedMessage {...messages.oldPassword} />}
        width="548px"
        type="password"
        // value={this.props.userTemporary.get('firstName')}
        // onChange={this.handleInputChange}
      />
      <Field
        name="newPassword"
        component={InputFieldRow}
        placeholder="Enter a new password"
        labelMessage={<FormattedMessage {...messages.newPassword} />}
        width="548px"
        type="password"
        // value={this.props.userTemporary.get('firstName')}
        // onChange={this.handleInputChange}
      />
    </Card>
  );
}

export default reduxForm({
  form: 'settings',
})(DetailsForm);
