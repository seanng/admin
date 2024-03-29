import styled from 'styled-components';
import metrics from 'themes/metrics';

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${metrics.paddingVertical};
  width: 100%;
`;

export default ContainerWrapper;
