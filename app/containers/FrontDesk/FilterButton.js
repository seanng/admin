import styled from 'styled-components';
import colors from 'themes/colors';
import Button from 'components/Button';

const FilterButton = styled(Button)`
  background-color: ${props =>
    props.selected ? colors.secondary : colors.white};
  height: 60px;
  width: 120px;
	box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${props => (props.selected ? colors.white : colors.secondary)};
`;

export default FilterButton;
