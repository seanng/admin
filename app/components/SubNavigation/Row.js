import styled from 'styled-components';
import metrics from 'themes/metrics';

const Row = styled.div`
  max-width: 100%;
  padding-top: ${metrics.paddingVertical};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export default Row;
