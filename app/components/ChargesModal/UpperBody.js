import styled from 'styled-components';
import metrics from 'themes/metrics';

const UpperBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${metrics.paddingVertical};
  padding-bottom: ${metrics.paddingVertical};
`;

export default UpperBody;
