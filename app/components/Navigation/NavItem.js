import styled from 'styled-components';

const NavItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${props => (props.first ? 0 : '40px')};
  cursor: pointer;
  color: white;
  height: 100%;
`;

export default NavItem;
