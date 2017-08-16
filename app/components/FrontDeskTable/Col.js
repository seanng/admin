import styled from 'styled-components';

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.alignLeft ? 'flex-start' : 'center')};
  width: ${props => props.width && props.width};
`;

export default Col;
