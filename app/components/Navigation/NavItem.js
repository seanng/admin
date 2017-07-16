import styled from 'styled-components';

const NavItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${props => (props.first ? 0 : '1.8rem')};
  cursor: pointer;
`;

export default NavItem;
