import React from 'react';
import TrashIcon from 'react-icons/lib/go/trashcan';
import TickIcon from 'react-icons/lib/go/check';
import CheckOutIcon from 'react-icons/lib/fa/sign-out';
import CheckInIcon from 'react-icons/lib/fa/sign-in';
import AddIcon from 'react-icons/lib/go/plus';
import colors from 'themes/colors';
import ButtonWrapper from './ButtonWrapper';

export default function getIconButton(status, onClick) {
  const size = 24;
  const map = {
    available: (
      <ButtonWrapper onClick={onClick} bgColor={colors.danger}>
        <TrashIcon color="white" size={size} />
      </ButtonWrapper>
    ),
    notReady: (
      <ButtonWrapper onClick={onClick}>
        <TickIcon color="white" size={size} />
      </ButtonWrapper>
    ),
    occupied: (
      <ButtonWrapper onClick={onClick} bgColor={colors.danger}>
        <CheckOutIcon color="white" size={size} />
      </ButtonWrapper>
    ),
    reserved: (
      <ButtonWrapper onClick={onClick}>
        <CheckInIcon color="white" size={size} />
      </ButtonWrapper>
    ),
    addRoom: (
      <ButtonWrapper onClick={onClick} bgColor={colors.accent} mr="0.8rem">
        <AddIcon color="white" size={size} />
      </ButtonWrapper>
    ),
  };
  return map[status];
}
