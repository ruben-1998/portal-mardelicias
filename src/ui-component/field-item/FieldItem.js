import React from 'react';
import { styled } from '@mui/material/styles';

const FieldWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
  '& span': {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  '& p': {
    margin: 0,
    marginTop: '0.15rem',
    fontWeight: 400,
    fontSize: '0.95rem'
  }
});

const FieldItem = ({ title, value }) => {
  return (
    <FieldWrapper>
      {title && <span>{title}</span>}
      {value && <p>{value}</p>}
    </FieldWrapper>
  );
};

export default FieldItem;
