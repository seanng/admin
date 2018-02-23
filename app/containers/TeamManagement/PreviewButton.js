import styled from 'styled-components';
import Button from 'components/Button';
import colors from 'themes/colors';

const PreviewButton = styled(Button)`
  height: 60px;
  width: 100%;
  background-color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.color && props.color};
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  margin-top: 1px;
`;

export default PreviewButton;
