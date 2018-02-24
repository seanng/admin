import styled from 'styled-components';
import colors from 'themes/colors';

const OpacityLayer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  padding-bottom: ${({ isHighlighted }) => (isHighlighted ? '6px' : '16px')};
  ${({ isHighlighted }) =>
    isHighlighted && `border: 10px solid ${colors.primary};`};
`;

export default OpacityLayer;
