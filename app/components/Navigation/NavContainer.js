import React from 'react';
import styled from 'styled-components';
import colors from 'themes/colors';
import Container from 'components/Container';

const FullWidthBar = styled.div`
  width: 100%;
  background-color: ${colors.dark};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.1em 0;
`;

export default function NavContainer({ children }) {
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
