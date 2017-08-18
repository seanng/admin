import React from 'react';
import TrashIcon from 'react-icons/lib/go/trashcan';
import TickIcon from 'react-icons/lib/go/check';
import CheckOutIcon from 'react-icons/lib/fa/sign-out';
import CheckInIcon from 'react-icons/lib/fa/sign-in';
import AddIcon from 'react-icons/lib/go/plus';
import colors from 'themes/colors';
import ButtonWrapper from './ButtonWrapper';

export default function getIconButton(status, onClick, key) {
  const size = 24;
  const map = {
    available: (
      <ButtonWrapper onClick={onClick} bgColor={colors.danger} key={key}>
        <TrashIcon color={colors.lightGray} size={size} />
      </ButtonWrapper>
    ),
    notReady: (
      <ButtonWrapper onClick={onClick} key={key}>
        <TickIcon color={colors.lightGray} size={size} />
      </ButtonWrapper>
    ),
    occupied: (
      <ButtonWrapper onClick={onClick} bgColor={colors.danger} key={key}>
        <CheckOutIcon color={colors.lightGray} size={size} />
      </ButtonWrapper>
    ),
    reserved: (
      <ButtonWrapper onClick={onClick} key={key}>
        <CheckInIcon color={colors.lightGray} size={size} />
      </ButtonWrapper>
    ),
    addRoom: (
      <ButtonWrapper onClick={onClick} bgColor={colors.accent}>
        <AddIcon color={colors.lightGray} size={size} />
      </ButtonWrapper>
    ),
  };
  return map[status];
}
