import React from 'react';
import styled from 'styled-components';
import { VictoryPie } from 'victory';

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  height: 26rem;
`;

function PieChart({ data }) {
  return (
    <Wrapper>
      <VictoryPie padAngle={3} innerRadius={100} data={data} />
    </Wrapper>
  );
}

export default PieChart;
