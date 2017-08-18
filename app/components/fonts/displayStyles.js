import styled from 'styled-components';
import colors from 'themes/colors';

const headerStyles = styled.span`
  display: ${props => (props.inline ? 'inline' : 'block')};
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 300;
  line-height: 1.1;
  color: ${props => (props.color ? props.color : colors.inputDark)};
`;

export default headerStyles;
