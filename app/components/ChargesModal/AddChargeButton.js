import styled from 'styled-components';
import colors from 'themes/colors';
import Button from 'components/Button';

const AddChargeButton = styled(Button)`
  background-color: ${colors.primary};
  height: 40px;
  width: 100px;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${colors.white};
`;

export default AddChargeButton;
