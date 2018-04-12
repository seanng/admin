import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Input from 'components/Input';
import messages from 'containers/App/messages';
import FormRow from './FormRow';
import FormLabel from './FormLabel';

const ValidationErrorMessage = styled.div`
  font-size: 12px;
  font-weight: 300px;
  color: red;
`;

export default function InputFieldRow({
  input,
  meta,
  labelMessage,
  ...otherProps
}) {
  return (
    <FormRow>
      <FormLabel>{labelMessage}</FormLabel>
      <div>
        <Input {...input} {...otherProps} error={meta.touched && meta.error} />
        {meta.touched &&
          meta.error && (
            <ValidationErrorMessage>
              <FormattedMessage {...messages[meta.error]} />
            </ValidationErrorMessage>
          )}
      </div>
    </FormRow>
  );
}
