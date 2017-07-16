import React from 'react';
import styled from 'styled-components';
import { VictoryPie } from 'victory';

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  height: 24rem;
`;

function PieChart({ data }) {
  const pieStyles = {
    labels: {
      fill: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  };
  return (
    <Wrapper>
      <VictoryPie
        padAngle={3}
        innerRadius={5}
        data={data}
        labelRadius={80}
        style={pieStyles}
      />
    </Wrapper>
  );
}

export default PieChart;
