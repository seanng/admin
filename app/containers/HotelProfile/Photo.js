import styled from 'styled-components';

const Photo = styled.div`
  ${props => props.src && `background-image: url(${props.src})`};
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: ${props => (props.height ? props.height : '180px')};
  margin-bottom: 15px;
`;

export default Photo;
