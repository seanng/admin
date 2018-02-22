import styled from 'styled-components';
import colors from 'themes/colors';

const AmenityEntry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 340px;
  height: 40px;
  padding: 10px;
  box-shadow: 0 1px 1px 0 #f5f5f5;
  color: ${colors.base2};
  font-size: 14px;
  font-weight: 600;
`;

export default AmenityEntry;
