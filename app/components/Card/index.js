/**
*
* Card
*
*/

import styled from 'styled-components';
import colors from 'themes/colors';

const Card = styled.div`
  position: relative;
  max-width: ${props => (props.width ? `${props.width}rem` : '25rem')};
  display: flex;
  flex-direction: column;
  border: 1px solid #eceff1;
  background-color: ${colors.white};
  border-radius: 0.15rem;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  flex: 1 1 auto;
`;

export default Card;
