import styled from 'styled-components';
import colors from 'themes/colors';

const BodyRowLayer = styled.div`
  width: 100%;
  border-radius: 0.8rem;
  background-color: ${colors.pearl1};
  flex-direction: row;
  display: flex;

  &:hover {
    background-color: ${colors.pearl4};
  }
`;

export default BodyRowLayer;
