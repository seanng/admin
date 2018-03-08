/**
*
* Input
*
*/

import React from 'react';
import styled from 'styled-components';
import colors from 'themes/colors';

const StyledInput = styled.input`
  font-size: 14px;
  font-weight: 300;
  color: ${colors.base2};
  background-color: ${colors.white};
  width: ${props => (props.width ? props.width : '100%')};
  height: 40px;
  border: 1px solid ${colors.base4};
  padding-left: 10px;
  ${props => props.styles && props.styles} &:focus {
    outline: none;
  }
`;

function Input({ type, value, onChange, name, placeholder, width, styles }) {
  console.log('the new value came in: ', value);
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      width={width}
      styles={styles}
    />
  );
}

export default Input;
