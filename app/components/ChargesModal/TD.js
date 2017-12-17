import styled from 'styled-components';
import colors from 'themes/colors';

const TD = styled.td`
  box-shadow: 0 1px 1px 0 ${colors.wallpaper};
  color: ${colors.base2};
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  text-align: ${props => (props.alignLeft ? 'left' : 'center')};
  ${props => props.first && 'padding-left: 20px;'};
`;

export default TD;
