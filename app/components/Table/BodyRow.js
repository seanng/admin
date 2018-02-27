import styled from 'styled-components';
import colors from 'themes/colors';

const BodyRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${colors.white};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  height: 60px;
  cursor: pointer;

  &:hover {
    border: ${`5px solid ${colors.primary}`};
  }
`;

export default BodyRow;
