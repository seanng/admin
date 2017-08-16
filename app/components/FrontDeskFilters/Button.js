import styled from 'styled-components';
import colors from 'themes/colors';
import Button from '../Button';

const FilterButton = styled(Button)`
  background-color: ${props => (props.selected ? colors.gold3 : colors.gray0)};

  &:hover {
    background-color: ${props => !props.selected && colors.gold3};
  }

`;

export default FilterButton;
