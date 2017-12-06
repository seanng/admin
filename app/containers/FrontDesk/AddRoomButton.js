import styled from 'styled-components';
import colors from 'themes/colors';
import Button from 'components/Button';

const AddRoomButton = styled(Button)`
  background-color: ${colors.primary};
  height: 60px;
  width: 140px;
	box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${colors.white};
`;

export default AddRoomButton;
