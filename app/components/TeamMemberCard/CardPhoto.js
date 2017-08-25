import styled from 'styled-components';

const CardPhoto = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  background-position: center;
  background-image: ${props => props.src && `url(${props.src})`};
  background-size: cover;
`;

export default CardPhoto;
