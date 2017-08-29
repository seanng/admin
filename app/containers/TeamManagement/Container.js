import styled from 'styled-components';
import metrics from 'themes/metrics';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(100vh - ${metrics.navBarHeight} - ${metrics.subNavHeight});
  width: 100%;
`;

export default Container;
