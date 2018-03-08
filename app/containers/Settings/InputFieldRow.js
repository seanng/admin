import React from 'react';
import Input from 'components/Input';
import FormRow from './FormRow';
import FormLabel from './FormLabel';

export default function InputFieldRow({ input, labelMessage, ...otherProps }) {
  return (
    <FormRow>
      <FormLabel>
        {labelMessage}
      </FormLabel>
      <Input {...input} {...otherProps} />
    </FormRow>
  );
}
