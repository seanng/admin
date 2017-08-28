/**
*
* Card
*
*/

import styled from 'styled-components';
import colors from 'themes/colors';
import metrics from 'themes/metrics';

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #eceff1;
  background-color: ${props => (props.color ? props.color : colors.white)};
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: ${props => (props.noPadding ? '0' : metrics.paddingVertical)};
  flex: 1 1 auto;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};

  &:hover {
    cursor: ${props => props.cursor && 'pointer'};
  }
`;

export default Card;
