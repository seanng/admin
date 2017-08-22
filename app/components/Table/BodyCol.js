import styled from 'styled-components';

const BodyCol = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.width && props.width};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
`;

export default BodyCol;