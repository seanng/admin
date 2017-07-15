/**
*
* Input
*
*/

import React from 'react';
import colors from 'themes/colors';

const inputStyle = {
  fontSize: '1rem',
  color: colors.inputText,
  backgroundColor: colors.white,
  borderRadius: '0.15rem',
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  padding: '0.65rem 0.8rem',
};

function Input({ type }) {
  return <input type={type} style={inputStyle} />;
}

export default Input;
