import styled from 'styled-components';
import colors from 'themes/colors';

export default styled.div`
  font-size: 12px
  font-weight: 300px;
  color: ${colors.danger};
  ${({ big }) =>
    big &&
    `
    font-size: 16px;
    margin-top: 10px;
  `}
`;
