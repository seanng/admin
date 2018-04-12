/**
 *
 * Button
 *
 */
import React from 'react';
import styled from 'styled-components';
import colors from 'themes/colors';

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => props.disabled && '0.3'};
  color: ${props => (props.textColor ? props.textColor : colors.lightGray)};
  padding-top: ${props => props.pv && `${props.pv}rem`};
  padding-bottom: ${props => props.pv && `${props.pv}rem`};
  padding-right: ${props => props.ph && `${props.ph}rem`};
  padding-left: ${props => props.ph && `${props.ph}rem`};
  margin-bottom: ${props => (props.mb ? `${props.mb}rem` : '0')};
  margin-right: ${props => (props.mr ? `${props.mr}rem` : '0')};
  margin-left: ${props => (props.ml ? `${props.ml}rem` : '0')};
  margin-top: ${props => (props.mt ? `${props.mt}rem` : '0')};
  width: ${props => props.width && props.width};
  flex: ${props => props.flex && props.flex};
`;

function Button({ onClick, disabled, children, ...rest }) {
  return (
    <StyledButton
      disabled={disabled}
      {...rest}
      onClick={() => !disabled && onClick()}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
