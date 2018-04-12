import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Input from 'components/Input';
import messages from 'containers/App/messages';
import RowWrapper from './RowWrapper';
import Label from './Label';

const ValidationErrorMessage = styled.div`
  font-size: 12px;
  font-weight: 300px;
  color: red;
`;

export default function InputFieldRow({
  labelMessage,
  meta,
  input,
  next,
  ...otherProps
}) {
  return (
    <RowWrapper next={next}>
      <Label>{labelMessage}</Label>
      <div>
        <Input {...input} {...otherProps} error={meta.touched && meta.error} />
        {meta.touched &&
          meta.error && (
            <ValidationErrorMessage>
              <FormattedMessage {...messages[meta.error]} />
            </ValidationErrorMessage>
          )}
      </div>
    </RowWrapper>
  );
}
