import styled from 'styled-components';
import metrics from 'themes/metrics';

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: ${metrics.paddingVertical};
  padding-bottom: ${metrics.paddingVertical};
`;

export default Body;
