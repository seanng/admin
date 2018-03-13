import styled from 'styled-components';
import colors from 'themes/colors';

export default styled.div`
  color: ${colors.base2};
  ${({ regular }) => regular && 'font-weight: normal;'} font-weight: 600;
  font-size: 14px;
`;
