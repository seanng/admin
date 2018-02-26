import styled from 'styled-components';
import colors from 'themes/colors';

const AddPhoto = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  cursor: pointer;
  background-color: ${colors.white};
  margin-bottom: 15px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.base3};
`;

export default AddPhoto;
