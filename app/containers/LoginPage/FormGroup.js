import React from 'react';
import styled from 'styled-components';
import Input from 'components/Input';

const Wrapper = styled.div`margin-bottom: 1.5rem;`;

const Label = styled.div`margin-bottom: 0.5rem;`;

function FormGroup({ label, inputType }) {
  return (
    <Wrapper>
      <Label>
        {label}
      </Label>
      <Input type={inputType} />
    </Wrapper>
  );
}

export default FormGroup;
