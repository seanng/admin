/**
*
* ReviewTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import Card from '../Card';
import Table from './Table';
import Thead from './Thead';
import ReviewEntryRow from './ReviewEntryRow';

function ReviewTable({ stays, handleOpenSurcharges }) {
  return (
    <Card>
      <Table>
        <Thead />
        <tbody>
          {stays.map(stay =>
            <ReviewEntryRow
              key={stay.id}
              stay={stay}
              handleOpenSurcharges={handleOpenSurcharges}
            />
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default ReviewTable;
