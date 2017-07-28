import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

function FilterDropdown({ onChange, activeFilter }) {
  const displayedFilter = {
    value: activeFilter,
    label: activeFilter,
  };
  const options = [
    { label: 'All' },
    { label: 'Available' },
    { label: 'Reserved' },
    { label: 'Not Ready' },
    { label: 'Occupied' },
  ];

  return (
    <StyledSelect
      name="filterInput"
      searchable={false}
      onChange={onChange}
      options={options}
      value={displayedFilter}
      clearable={false}
      autofocus
    />
  );
}

const StyledSelect = styled(Select)`
  width: 10rem;
`;

export default FilterDropdown;
