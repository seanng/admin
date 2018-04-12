import styled from 'styled-components';
import colors from 'themes/colors';
import Button from 'components/Button';

const SubNavButton = styled(Button)`
  background-color: ${props => (props.active ? colors.base2 : colors.white)};
  height: 60px;
  width: 120px;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${props => (props.active ? colors.white : colors.base2)};
  ${props =>
    !props.active && 'box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);'} ${props =>
    !props.first && 'margin-left: 10px;'};
`;

export default SubNavButton;
