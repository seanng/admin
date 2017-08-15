/**
*
* SubNavigation
*
*/

import React from 'react';
// import styled from 'styled-components';

import H5 from '../fonts/H5';
import Row from './Row';
import Button from './Button';

function SubNavigation({ items, pathname }) {
  return (
    <Row>
      {items.toJS().map(({ name, path }) =>
        <Button
          key={name}
          selected={pathname === path}
          onClick={() => this.props.router.push(path)}
          mr={2}
        >
          <H5 mb="0">
            {name}
          </H5>
        </Button>
      )}
    </Row>
  );
}

export default SubNavigation;
