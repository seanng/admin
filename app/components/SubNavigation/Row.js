import styled from 'styled-components';
import metrics from 'themes/metrics';

const Row = styled.div`
  max-width: 100%;
  height: ${metrics.subNavHeight};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default Row;
