import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomInput = ({ name, label, values, errors, touched, id, ...otherProps }) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth error={Boolean(touched[name] && errors[name])} sx={{ ...theme.typography.customInput }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput id={id} value={values[name]} name={name} label={label} {...otherProps} />
      {touched[name] && errors[name] && (
        <FormHelperText error id="standard-weight-helper-text">
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
