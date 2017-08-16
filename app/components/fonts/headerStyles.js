import styled from 'styled-components';
import colors from 'themes/colors';

const headerStyles = styled.span`
  display: ${props => (props.inline ? 'inline' : 'block')};
  margin-bottom: ${props =>
    props.mb !== undefined ? `${props.mb}rem` : '0.5rem'};
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  color: ${props => (props.color ? props.color : colors.gray3)};
`;

export default headerStyles;
