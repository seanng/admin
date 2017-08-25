import styled from 'styled-components';

const PreviewPhoto = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: ${props => props.src && `url(${props.src})`};
  background-size: cover;
  background-position: center;
`;

export default PreviewPhoto;
