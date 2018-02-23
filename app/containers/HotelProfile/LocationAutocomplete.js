import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';
import colors from 'themes/colors';

const LocationAutocomplete = styled(PlacesAutocomplete)`
  font-size: 14px;
  font-weight: 300;
  color: ${colors.base2};
  background-color: ${colors.white};
  width: ${props => (props.width ? props.width : '100%')};
  height: 40px;
  border: 1px solid ${colors.base4};
  padding-left: 10px;
`;

export default LocationAutocomplete;
