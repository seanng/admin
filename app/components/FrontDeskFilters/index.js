/**
*
* FrontDeskFilters
*
*/

import React from 'react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import H5 from '../fonts/H5';
import Container from './Container';
import Button from './Button';

function FrontDeskFilters({ filterOptions, activeFilter, handleFilterChange }) {
  return (
    <Container>
      {filterOptions.map(option =>
        <Button
          key={option}
          selected={option === activeFilter}
          onClick={() => handleFilterChange(option)}
          mr={1.5}
          width="10rem"
        >
          <H5 mb={0} color="white">
            {option}
          </H5>
        </Button>
      )}
    </Container>
  );
}

export default FrontDeskFilters;
