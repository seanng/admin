import styled from 'styled-components';
import colors from 'themes/colors';

const OpacityLayer = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.white};
  ${props =>
    props.isEditingMode &&
    `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: move;
  `};
`;

export default OpacityLayer;
