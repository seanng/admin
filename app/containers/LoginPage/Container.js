import styled from 'styled-components';
import images from 'themes/images';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${images.loginBackground});
  background-position: center center;
  background-size: cover;
`;

export default Container;
