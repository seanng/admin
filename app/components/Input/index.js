/**
*
* Input
*
*/

import React from 'react';
import colors from 'themes/colors';

const inputStyle = {
  fontSize: '1rem',
  color: colors.gray2,
  backgroundColor: colors.pearl3,
  borderRadius: '0.15rem',
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  padding: '0.65rem 0.8rem',
};

function Input({ type, value, onChange, name, placeholder }) {
  return (
    <input
      type={type}
      style={inputStyle}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
}

export default Input;
