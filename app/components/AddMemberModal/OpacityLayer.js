import styled from 'styled-components';

const OpacityLayer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding: 10px;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

export default OpacityLayer;
