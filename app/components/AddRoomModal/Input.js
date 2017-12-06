import styled from 'styled-components';
import colors from 'themes/colors';

const Input = styled.input`
  color: ${colors.secondary};
  caret-color: ${colors.primary};
  height: 65px;
  width: 240px;
  outline: none;
  line-height: 65px;
  text-align: center;
  font-size: 48px;
  font-weight: 600;
`;

export default Input;
