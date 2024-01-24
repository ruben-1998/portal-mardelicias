import React from 'react';
import CustomTable from '../../../ui-component/table/CustomTable';
import { Box, Typography } from '@mui/material';

const OrderProductsList = ({ data }) => {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1
    },
    {
      field: 'qty',
      headerName: 'Cantidad',
      flex: 1
    },
    {
      field: 'price',
      headerName: 'Precio',
      flex: 1
    }
  ];
  return (
    <Box sx={{ minHeight: 422 }}>
      <CustomTable rows={data?.products} columns={columns} hideFooterPagination />
      <Typography sx={{ display: 'flex', justifyContent: 'right', paddingTop: '1.5rem' }}>
        <strong style={{ marginRight: '2rem' }}>Total: </strong>${data?.total}
      </Typography>
    </Box>
  );
};

export default OrderProductsList;
