// modalStyle - guide: https://github.com/reactjs/react-modal#styles
import colors from 'themes/colors';
export default {
  overlay: {
    backgroundColor: colors.modalOverlay,
  },
  content: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: '800px',
    borderRadius: '0px',
    padding: '0px 40px',
  },
};
