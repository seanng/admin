import styled from 'styled-components';
import colors from 'themes/colors';
import DefaultButton from 'components/Button';

const Button = styled(DefaultButton)`
  background-color: ${props =>
    props.selected ? colors.accent : colors.complementary};

  &:hover {
    background-color: #6cc0e5;
  }
`;

export default Button;
