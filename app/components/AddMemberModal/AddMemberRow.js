import React from 'react';
import styled from 'styled-components';
import Input from 'components/Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 435px;
  align-items: center;
  margin-bottom: 26px;
`;

export default function AddMemberRow({
  labelMessage,
  meta,
  input,
  ...otherProps
}) {
  return (
    <Wrapper>
      {labelMessage}
      <Input {...input} {...otherProps} error={meta.touched && meta.error} />
    </Wrapper>
  );
}
