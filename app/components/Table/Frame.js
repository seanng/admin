import styled from 'styled-components';

const Frame = styled.div`
  margin-top: ${props => props.mt && `${props.mt}rem`};
  margin-bottom: 1rem;
  width: 100%;
`;

export default Frame;
