import styled from 'styled-components';
import colors from 'themes/colors';

const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 456px;
  padding: 30px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
`;

export default Card;
