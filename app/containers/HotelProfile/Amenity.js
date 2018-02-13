import React from 'react';
import { FormattedMessage } from 'react-intl';
import MiniBarIcon from 'react-icons/lib/md/local-gas-station';
import styled from 'styled-components';
import messages from './messages';

const mapAmenityToIcon = {
  miniBar: <MiniBarIcon size={24} />,
};

export default function Amenity({ amenity, index }) {
  return (
    <Wrapper index={index}>
      <div style={{ marginBottom: '4px' }}>
        {mapAmenityToIcon[amenity]}
      </div>
      <FormattedMessage {...messages[amenity]} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 105px;
  margin-left: ${props => props.index === 0 && '-15px'};
`;
