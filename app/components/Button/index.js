/**
*
* Button
*
*/

import styled from 'styled-components';
import colors from 'themes/colors';

const Button = styled.div`
  display: inline-block;
  line-height: 1.25;
  text-align: center;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.15rem;
  cursor: pointer;
  box-shadow: '0 1px 1px rgba(0, 0, 0, 0.09), 0 1px 2px rgba(0, 0, 0, 0.05)';
  background-color: ${props => (props.bgColor ? props.bgColor : colors.blue3)};
  color: ${props => (props.textColor ? props.textColor : colors.pearl3)};
  padding-right: ${props => props.ph && `${props.ph}rem`};
  padding-left: ${props => props.ph && `${props.ph}rem`};
  margin-bottom: ${props => (props.mb ? `${props.mb}rem` : '0')};
  margin-right: ${props => (props.mr ? `${props.mr}rem` : '0')};
  margin-left: ${props => (props.ml ? `${props.ml}rem` : '0')};
  margin-top: ${props => (props.mt ? `${props.mt}rem` : '0')};
  width: ${props => props.width && `${props.width}rem`};
`;

export default Button;
