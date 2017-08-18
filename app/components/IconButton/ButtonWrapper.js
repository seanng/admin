import styled from 'styled-components';
import colors from 'themes/colors';

const ButtonWrapper = styled.div`
  display: flex;
  background-color: ${props => (props.bgColor ? props.bgColor : colors.accent)};
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  border-radius: 1.5rem;
  cursor: pointer;
  float: right;
  margin-right: ${props => props.mr && props.mr};
`;

export default ButtonWrapper;
