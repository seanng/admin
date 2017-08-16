import styled from 'styled-components';
import colors from 'themes/colors';
import Button from '../Button';

const FilterButton = styled(Button)`
  background-color: ${props => (props.selected ? colors.gold4 : colors.gray3)};

  &:hover {
    background-color: ${props => !props.selected && colors.gold4};
  }

`;

export default FilterButton;
