import styled from 'styled-components';
import colors from 'themes/colors';

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.base2};
  ${props => props.next && 'margin-top: 20px;'};
`;

export default RowWrapper;
