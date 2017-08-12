import styled from 'styled-components';
import colors from 'themes/colors';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: ${colors.secondary};
`;

export default Header;
