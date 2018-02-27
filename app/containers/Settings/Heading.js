import styled from 'styled-components';
import colors from 'themes/colors';

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
  height: 60px;
  width: 644px;
  background-color: ${colors.base2};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: 600;
  line-height: 19px;
  color: ${colors.white};
`;

export default Heading;
