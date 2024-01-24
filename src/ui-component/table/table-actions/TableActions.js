import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Edit, Delete, RemoveRedEye } from '@mui/icons-material';

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  gap: 2
});
const TableActions = ({ onEdit, onView, onDelete }) => {
  return (
    <Container>
      {onEdit && (
        <IconButton aria-label="edit" onClick={onEdit}>
          <Edit />
        </IconButton>
      )}
      {onView && (
        <IconButton aria-label="view" onClick={onView}>
          <RemoveRedEye />
        </IconButton>
      )}

      {onDelete && (
        <IconButton aria-label="delete" onClick={onDelete}>
          <Delete />
        </IconButton>
      )}
    </Container>
  );
};

export default TableActions;
