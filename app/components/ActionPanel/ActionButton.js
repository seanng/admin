import React from 'react';
import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import Button from '../Button';
import messages from './messages';

function ActionButton({ status, handleClick, roomNumber, index }) {
  const onClick = () => handleClick(roomNumber, status, index);
  switch (status) {
    case 'Available':
      return (
        <Button bgColor={colors.bsDanger} width={6.5} onClick={onClick}>
          <FormattedMessage {...messages.remove} />
        </Button>
      );
    case 'Checked Out':
      return (
        <Button bgColor={colors.bsSuccess} width={6.5} onClick={onClick}>
          <FormattedMessage {...messages.makeAvailable} />
        </Button>
      );
    case 'Inbound':
      return (
        <Button bgColor={colors.bsInfo} width={6.5} onClick={onClick}>
          <FormattedMessage {...messages.checkin} />
        </Button>
      );
    default:
      return null;
  }
}

export default ActionButton;
