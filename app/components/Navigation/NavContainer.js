import React from 'react';
import styled from 'styled-components';
import metrics from 'themes/metrics';
import colors from 'themes/colors';
import Container from 'components/Container';

const FullWidthBar = styled.div`
  width: 100%;
  background-color: ${colors.primary};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${metrics.navBarHeight};
`;

export default function NavContainer({ children }) {
  return (
    <FullWidthBar>
      <Container>
        <Wrapper>{children}</Wrapper>
      </Container>
    </FullWidthBar>
  );
}
