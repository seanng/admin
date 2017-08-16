import styled from 'styled-components';

const ColTop = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.width && props.width};
  justify-content: ${props => (props.alignLeft ? 'flex-start' : 'center')};
`;

export default ColTop;
