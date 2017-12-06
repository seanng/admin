import styled from 'styled-components';

const Container = styled.div`
  margin-top: ${props => props.mt && `${props.mt}rem`};
  margin-bottom: 1rem;
  width: 100%;
`;

export default Container;
