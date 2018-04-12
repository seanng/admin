import styled from 'styled-components';
import colors from 'themes/colors';
import FormLabel from './FormLabel';

export default styled(FormLabel)`
  color: ${colors.base2};
  ${({ regular }) => regular && 'font-weight: normal;'};
`;
