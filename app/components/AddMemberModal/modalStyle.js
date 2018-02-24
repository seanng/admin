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
    margin: '0 auto',
    height: '510px',
    maxHeight: '90%',
    width: '800px',
    borderRadius: '0px',
    padding: '40px',
  },
};
