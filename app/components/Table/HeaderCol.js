import styled from 'styled-components';

const HeaderCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.width ? props.width : '100px')};
  margin-left: ${props => props.ml && props.ml};
  margin-right: ${props => props.mr && props.mr};
  color: #8f97a1;
  font-size: 14px;
  font-weight: 600px;
`;

export default HeaderCol;
