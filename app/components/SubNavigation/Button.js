import styled from 'styled-components';
import colors from 'themes/colors';
import DefaultButton from 'components/Button';

const Button = styled(DefaultButton)`
  background-color: ${props =>
    props.selected ? colors.support : colors.base2};
  min-width: 12rem;

  &:hover {
    background-color: ${props => !props.selected && colors.support};
  }
`;

export default Button;
