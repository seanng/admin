import styled from 'styled-components';
import metrics from 'themes/metrics';

const UpperBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${metrics.paddingVertical};
  padding-bottom: ${metrics.paddingVertical};
  border-bottom: 1px dotted silver;
`;

export default UpperBody;
