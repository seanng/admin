import styled from 'styled-components';
import colors from 'themes/colors';

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  margin-bottom: ${props => props.mb && props.mb};
  background-color: ${colors.base};
`;

export default HeaderRow;
