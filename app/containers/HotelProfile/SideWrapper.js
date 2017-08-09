import styled from 'styled-components';

const SideWrapper = styled.div`
  flex: ${props => (props.flex ? props.flex : 1)};
  padding-right: ${props => (props.right ? '0' : '0.5rem')};
  padding-left: ${props => (props.right ? '0.5rem' : '0')};
`;

export default SideWrapper;
