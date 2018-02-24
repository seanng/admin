import styled from 'styled-components';
import colors from 'themes/colors';

const AddPhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 235px;
  width: 235px;
  background-color: ${colors.white};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`;

export default AddPhoto;
