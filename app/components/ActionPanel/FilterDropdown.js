import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

function FilterDropdown({ onChange, activeFilter, options }) {
  return (
    <StyledSelect
      simpleValue
      name="filterInput"
      searchable={false}
      onChange={onChange}
      options={options}
      value={activeFilter}
      clearable={false}
    />
  );
}

const StyledSelect = styled(Select)`
  width: 10rem;
`;

export default FilterDropdown;
