import styled from 'styled-components';
import colors from 'themes/colors';

const LTD = styled.td`
  color: ${props => (props.label ? colors.base3 : colors.base1)};
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  text-align: ${props => (props.label ? 'left' : 'center')};
  ${props => props.label && 'padding-left: 20px;'};
`;

export default LTD;
