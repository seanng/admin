import styled from 'styled-components';
import colors from 'themes/colors';

const BodyCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.width ? props.width : '100px')};
  margin-right: ${props => props.mr && props.mr};
  margin-left: ${props => props.ml && props.ml};
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.color ? props.color : colors.base2)};
`;

export default BodyCol;
