import React from 'react';
import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import MiniBarIcon from 'react-icons/lib/md/local-gas-station';
import TrashIcon from 'react-icons/lib/md/delete';
import styled from 'styled-components';
import messages from './messages';

const mapAmenityToIcon = {
  miniBar: <MiniBarIcon size={24} />,
};

export default function Amenity({ amenity, index, isEditing, removeAmenity }) {
  return (
    <Container>
      {isEditing &&
        <TrashIcon
          color={colors.danger}
          size={20}
          style={{ cursor: 'pointer', position: 'absolute' }}
          onClick={() => removeAmenity(index)}
        />}
      <Wrapper index={index}>
        <div style={{ marginBottom: '4px' }}>
          {mapAmenityToIcon[amenity]}
        </div>
        <FormattedMessage {...messages[amenity]} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 105px;
  margin-left: ${props => props.index === 0 && '-15px'};
`;
