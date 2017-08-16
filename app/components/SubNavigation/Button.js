import styled from 'styled-components';
import colors from 'themes/colors';
import DefaultButton from 'components/Button';

const Button = styled(DefaultButton)`
  background-color: ${props => (props.selected ? colors.gold4 : colors.gray3)};

  &:hover {
    background-color: ${props => !props.selected && colors.gold4};
  }
`;

export default Button;
