import styled from 'styled-components';

const NavItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${props => (props.first ? 0 : '3rem')};
  cursor: pointer;
  color: white;
`;

export default NavItem;
