import styled from 'styled-components';
import colors from 'themes/colors';
import NormalButton from 'components/Button';

const Button = styled(NormalButton)`
  background-color: ${props => (props.primary ? colors.primary : colors.base1)};
  height: 60px;
  width: 240px;
	box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${colors.white};
  margin: 0 auto 20px auto;
`;

export default Button;
