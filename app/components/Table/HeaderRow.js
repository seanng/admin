import styled from 'styled-components';

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: ${props => props.mb && `${props.mb}rem`};
`;

export default HeaderRow;
