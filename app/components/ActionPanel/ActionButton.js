import { camelize } from 'utils/helpers';
import getIconButton from '../IconButton';

function ActionButton({ status, handleClick, roomNumber, index }) {
  const onClick = () => handleClick(roomNumber, status, index);
  return getIconButton(camelize(status), onClick);
}

export default ActionButton;
