import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Input from 'components/Input';
import messages from 'containers/App/messages';

const ValidationErrorMessage = styled.div`
  font-size: 12px;
  font-weight: 300px;
  color: red;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 435px;
  align-items: center;
  margin-bottom: 26px;
`;

export default function AddMemberRow({
  labelMessage,
  meta,
  input,
  ...otherProps
}) {
  return (
    <Wrapper>
      {labelMessage}
      <div>
        <Input {...input} {...otherProps} error={meta.touched && meta.error} />
        {meta.touched &&
          meta.error &&
          <ValidationErrorMessage>
            <FormattedMessage {...messages[meta.error]} />
          </ValidationErrorMessage>}
      </div>
    </Wrapper>
  );
}
