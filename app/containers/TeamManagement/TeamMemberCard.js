import styled from 'styled-components';
import colors from 'themes/colors';

const TeamMemberCard = styled.div`
  position: relative;
  margin-left: 21px;
  margin-bottom: 20px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  height: 235px;
  width: 235px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${({ src }) => (src ? colors.white : colors.base2)};
  ${({ src }) => src && `background-image: url(${src});`};
`;

export default TeamMemberCard;
