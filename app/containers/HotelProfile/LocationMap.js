import React from 'react';
import { compose, withProps } from 'recompose';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

const mapStyle = [
  {
    featureType: 'water',
    stylers: [
      {
        saturation: 43,
      },
      {
        lightness: -11,
      },
      {
        hue: '#0088ff',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        hue: '#ff0000',
      },
      {
        saturation: -100,
      },
      {
        lightness: 99,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#808080',
      },
      {
        lightness: 54,
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ece2d9',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ccdca1',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#767676',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#b8cb93',
      },
    ],
  },
  {
    featureType: 'poi.park',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
];

const LocationMap = compose(
  withProps({
    mapElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `220px`, marginTop: `20px` }} />,
  }),
  withGoogleMap
)(({ lat, lng }) => {
  const coordinates = { lat, lng };
  return (
    <GoogleMap
      defaultZoom={17}
      center={coordinates}
      defaultOptions={{ styles: mapStyle }}
    >
      <Marker position={coordinates} />
    </GoogleMap>
  );
});

export default LocationMap;
