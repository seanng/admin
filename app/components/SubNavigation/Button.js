import styled from 'styled-components';
import colors from 'themes/colors';
import DefaultButton from 'components/Button';

const Button = styled(DefaultButton)`
  background-color: ${props => (props.selected ? colors.gold3 : colors.gray0)};

  &:hover {
    background-color: ${props => !props.selected && colors.gold3};
  }
`;

export default Button;
