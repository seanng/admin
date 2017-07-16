import React from 'react';
import styled from 'styled-components';
import colors from 'themes/colors';
import Container from 'components/Container';

const FullWidthBar = styled.div`
  width: 100%;
  background-color: ${colors.white};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

function BottomNavWrapper({ children }) {
  return (
    <FullWidthBar>
      <Container>
        <Wrapper>
          {children}
        </Wrapper>
      </Container>
    </FullWidthBar>
  );
}

export default BottomNavWrapper;
