import styled from 'styled-components';
import colors from 'themes/colors';

const AddPhotoCard = styled.div`
  position: relative;
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
  `};
`;

export default AddPhotoCard;
