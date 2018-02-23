import styled from 'styled-components';
import colors from 'themes/colors';

const PreviewInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
  padding-top: 35px;
  background-color: ${colors.white};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export default PreviewInfoCard;
