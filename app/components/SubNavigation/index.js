/**
*
* SubNavigation
*
*/

import React from 'react';
// import styled from 'styled-components';
import colors from 'themes/colors';
import H5 from '../fonts/H5';
import Row from './Row';
import Button from './Button';

function SubNavigation({ items, pathname, router }) {
  return (
    <Row>
      {items.toJS().map(({ name, path }) =>
        <Button
          key={name}
          selected={pathname === path}
          onClick={() => router.push(path)}
          mr={2}
          width={12}
        >
          <H5 mb="0" color={colors.pearl3}>
            {name}
          </H5>
        </Button>
      )}
    </Row>
  );
}

export default SubNavigation;
