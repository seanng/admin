/**
*
* Input
*
*/

import React from 'react';
import styled from 'styled-components';
import colors from 'themes/colors';

const StyledInput = styled.input`
  font-size: 1rem;
  color: ${colors.inputDark};
  background-color: ${colors.white};
  border-radius: 0.8rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.65rem 0.8rem;

  &:focus {
    outline: none;
  }
`;

function Input({ type, value, onChange, name, placeholder }) {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
}

export default Input;
