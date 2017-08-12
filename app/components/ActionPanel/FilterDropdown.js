import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import H5 from '../fonts/H5';

function FilterDropdown({ onChange, activeFilter, options }) {
  return (
    <Wrapper>
      <H5 mb={0}>&nbsp;Filter: &nbsp;&nbsp;&nbsp;</H5>
      <StyledSelect
        simpleValue
        name="filterInput"
        searchable={false}
        onChange={onChange}
        options={options}
        value={activeFilter}
        clearable={false}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const StyledSelect = styled(Select)`
  width: 10rem;
`;

export default FilterDropdown;
