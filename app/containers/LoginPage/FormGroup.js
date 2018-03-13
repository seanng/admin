import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Input from 'components/Input';
import messages from '../App/messages';
import ValidationErrorMessage from './ValidationErrorMessage';

const Wrapper = styled.div`margin-bottom: 1.5rem;`;

const Label = styled.div`margin-bottom: 0.5rem;`;

function FormGroup({ labelMessage, input, meta, ...props }) {
  return (
    <Wrapper>
      <Label>
        {labelMessage}
      </Label>
      <div>
        <Input {...input} {...props} />
        {meta.touched &&
          meta.error &&
          <ValidationErrorMessage>
            <FormattedMessage {...messages[meta.error]} />
          </ValidationErrorMessage>}
      </div>
    </Wrapper>
  );
}

export default FormGroup;
