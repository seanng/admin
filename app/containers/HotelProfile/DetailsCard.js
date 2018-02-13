import styled from 'styled-components';
import colors from 'themes/colors';

const DetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
  margin-bottom: 10px;
`;

export default DetailsCard;
