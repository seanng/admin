import styled from 'styled-components';

const PreviewPhoto = styled.div`
  position: relative;
  height: 235px;
  width: 235px;
  background-image: ${props => props.src && `url(${props.src})`};
  background-size: cover;
  background-position: center;
`;

export default PreviewPhoto;
