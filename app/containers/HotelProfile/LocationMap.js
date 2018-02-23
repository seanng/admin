import React from 'react';
import { compose, withProps } from 'recompose';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

const LocationMap = compose(
  withProps({
    mapElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `220px`, marginTop: `20px` }} />,
  }),
  withGoogleMap
)(({ lat, lng }) => {
  const coordinates = { lat, lng };
  return (
    <GoogleMap defaultZoom={17} center={coordinates}>
      <Marker position={coordinates} />
    </GoogleMap>
  );
});

export default LocationMap;
