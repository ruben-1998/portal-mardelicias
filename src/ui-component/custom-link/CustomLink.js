import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SimpleLink = styled(Link)(() => ({
  color: '#364152'
}));

const CustomLink = ({ url, title }) => {
  return <SimpleLink to={`${url}`}>{title}</SimpleLink>;
};

export default CustomLink;
