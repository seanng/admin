import React from 'react';
import { compose, withProps } from 'recompose';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const GoogleMapAPIKey = 'AIzaSyB7Rmn_mcqp4RySZWJb4sD2Iz4itp2caBU';

const LocationMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPIKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `220px`, marginTop: `20px` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withScriptjs,
  withGoogleMap
)(props => <GoogleMap defaultZoom={5} defaultCenter={props.center} />);

export default LocationMap;
