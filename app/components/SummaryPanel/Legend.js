import React from 'react';
import styled from 'styled-components';
import colors from 'themes/colors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${props => props.main && '3rem'};
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Icon = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${props => props.color};
  border: 1px solid ${colors.textPrimary};
  margin-right: 1rem;
`;

export default function Legend() {
  return (
    <Wrapper main>
      <Item>
        <Icon color={colors.bsSuccess} />
        <Wrapper>
          <FormattedMessage {...messages.available} />
        </Wrapper>
      </Item>
      <Item>
        <Icon color={colors.bsWarning} />
        <Wrapper>
          <FormattedMessage {...messages.reserved} />
        </Wrapper>
      </Item>
      <Item>
        <Icon color={colors.bsDanger} />
        <Wrapper>
          <FormattedMessage {...messages.occupied} />
        </Wrapper>
      </Item>
      <Item>
        <Icon color={colors.bsPrimary} />
        <Wrapper>
          <FormattedMessage {...messages.notReady} />
        </Wrapper>
      </Item>
    </Wrapper>
  );
}
