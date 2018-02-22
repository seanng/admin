import React from 'react';
import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import amenities from 'data/amenities';
import TrashIcon from 'react-icons/lib/md/delete';
// TO DELETE: react-icons.
import MiniBarIcon from 'react-icons/lib/md/local-gas-station';
import LaundryIcon from 'react-icons/lib/md/local-laundry-service';
import WifiIcon from 'react-icons/lib/md/wifi';
import styled from 'styled-components';

// TO DELETE (move to data/amenities)
const mapAmenityToIcon = {
  miniBar: <MiniBarIcon size={24} />,
  laundry: <LaundryIcon size={24} />,
  freeWifi: <WifiIcon size={24} />,
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
          {/* TODO: change to image & source from amenities[amenity].imageSource */}
          {mapAmenityToIcon[amenity]}
        </div>
        <FormattedMessage {...amenities[amenity].message} />
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
