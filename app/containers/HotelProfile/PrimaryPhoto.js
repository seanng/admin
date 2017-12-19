import styled from 'styled-components';

const PrimaryPhoto = styled.div`
  ${props => props.src && `background-image: url(${  props.src  })`};
  background-size: cover;
  width: 100%;
  height: 190px;
`;

export default PrimaryPhoto;
