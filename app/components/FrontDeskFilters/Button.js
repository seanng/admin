import styled from 'styled-components';
import colors from 'themes/colors';
import Button from '../Button';

const FilterButton = styled(Button)`
  background-color: ${props =>
    props.selected ? colors.accent : colors.complementary};
  &:hover {
    background-color: #6cc0e5;
  }

`;

export default FilterButton;
