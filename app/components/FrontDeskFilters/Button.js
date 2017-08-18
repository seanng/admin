import styled from 'styled-components';
import colors from 'themes/colors';
import Button from '../Button';

const FilterButton = styled(Button)`
  background-color: ${props => (props.selected ? colors.support : colors.base)};

  &:hover {
    background-color: ${props => !props.selected && colors.support};
  }

`;

export default FilterButton;
