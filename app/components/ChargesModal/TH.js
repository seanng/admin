import styled from 'styled-components';
import colors from 'themes/colors';

const TH = styled.th`
  height: 40px;
  background-color: ${colors.wallpaper};
  color: ${colors.base3};
  font-size: 14px;
  ${props => props.first && 'padding-left: 20px;'} ${props =>
    props.alignLeft && 'text-align: left'};
`;

export default TH;
