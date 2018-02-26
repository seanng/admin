import styled from 'styled-components';
import colors from 'themes/colors';

const AddPhoto = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 235px;
  width: 235px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);

  ${({ src }) =>
    src
      ? `
    background-image: url(${src});
    background-position: center center;
    background-size: cover;
  `
      : `
    background-color: ${colors.white};
  `};
`;

export default AddPhoto;
