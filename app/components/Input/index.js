/**
*
* Input
*
*/

import styled from 'styled-components';
import colors from 'themes/colors';

export default styled.input`
  font-size: 14px;
  font-weight: 300;
  color: ${colors.base2};
  background-color: ${colors.white};
  width: ${props => (props.width ? props.width : '100%')};
  height: 40px;
  border: 1px solid ${colors.base4};
  padding-left: 10px;
  ${({ error }) => error && `border: 1px solid ${colors.danger};`} ${props =>
      props.styles && props.styles} &:focus {
    outline: none;
  }
`;
