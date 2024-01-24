import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { ORDER_STATUS, ORDER_STATUS_DEFINITIONS } from '../../../utils/constants';
import { styled, useTheme } from '@mui/material/styles';
import FieldItem from '../../../ui-component/field-item/FieldItem';
import { Lightbox } from 'react-modal-image';
import moment from 'moment/moment';
import useDeliveryData from '../../../hooks/useDeliveryUserData';

const VoucherWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const ItemLink = styled(Button)(({ theme }) => ({
  borderBottom: `2px solid #673ab7`,
  cursor: 'pointer',
  padding: 0,
  color: 'black',
  borderRadius: 0,
  fontWeight: 400
}));

const OrderDescriptionCard = ({ data, onSubmit }) => {
  const { data: deliveryData, isLoading, error } = useDeliveryData();

  const [openVoucher, setOpenVoucher] = useState(false);

  const theme = useTheme();
  const validations = Yup.object().shape({
    status: Yup.string().required('El estado del pedido es requerido'),
    driver_user: Yup.string().required('Debe asignar un repartidor para el pedido')
  });

  const onOpenVoucher = () => {
    setOpenVoucher(true);
  };

  const onCloseVoucher = () => {
    setOpenVoucher(false);
  };

  if (isLoading || error) return null;

  return (
    <Formik
      initialValues={{ ...data, driver_user: data?.orders_driver_user_fkey?.id ?? '' }}
      validationSchema={validations}
      onSubmit={onSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth error={Boolean(touched.status && errors.status)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-status">Estado</InputLabel>
            <Select
              labelId="outlined-adornment-status"
              id="demo-simple-select"
              value={values.status}
              name="status"
              onBlur={handleBlur}
              onChange={handleChange}
              sx={{ '& .MuiSelect-select': { padding: '30.5px 14px 11.5px' } }}
            >
              {ORDER_STATUS?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {touched.status && errors.status && (
              <FormHelperText error id="standard-weight-helper-status">
                {errors.status}
              </FormHelperText>
            )}
          </FormControl>
          <Divider sx={{ marginY: '1rem' }} />
          {!isLoading && deliveryData && (
            <FormControl fullWidth error={Boolean(touched.driver_user && errors.driver_user)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-driver_user">Repartidor</InputLabel>
              <Select
                labelId="outlined-adornment-driver_user"
                id="demo-simple-select"
                value={values.driver_user}
                name="driver_user"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ '& .MuiSelect-select': { padding: '30.5px 14px 11.5px' } }}
                disabled={values.status === ORDER_STATUS_DEFINITIONS.DELIVERED || values.status === ORDER_STATUS_DEFINITIONS.DISPATCH}
              >
                {deliveryData.map((delivery) => (
                  <MenuItem key={delivery?.id} value={delivery?.id}>
                    {delivery?.first_name} {delivery?.last_name}
                  </MenuItem>
                ))}
              </Select>
              {touched.driver_user && errors.driver_user && (
                <FormHelperText error id="standard-weight-helper-status">
                  {errors.driver_user}
                </FormHelperText>
              )}
            </FormControl>
          )}
          <Divider sx={{ marginY: '1rem' }} />
          <FieldItem title={'Cliente'} value={`${data.users.first_name} ${data.users.last_name}`} />
          <FieldItem title={'Creación'} value={moment(data.created_at).format('DD/MM/YYYY')} />
          <VoucherWrapper>
            {data.payment_method && <FieldItem title={'Metodo de pago'} value={data.payment_method} />}
            {data.payment_method !== 'Efectivo' && data?.voucher_url && (
              <ItemLink onClick={onOpenVoucher} variant="text">
                Ver Comprobante
              </ItemLink>
            )}
          </VoucherWrapper>
          <Divider sx={{ marginY: '1rem' }} />
          <FieldItem title={'Dirección de envio'} value={data.users.direction} />
          <FieldItem title={'Detalle'} value={data.users.direction_detail} />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Button
            disableElevation
            fullWidth
            disabled={isSubmitting}
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ display: 'block', marginTop: '1rem' }}
          >
            Guardar
          </Button>
          {data?.voucher_url && openVoucher && (
            <Lightbox
              medium={`https://nmswwbindwiwxgeravfq.supabase.co/storage/v1/object/public/vouchers/${data?.voucher_url}`}
              large={`https://nmswwbindwiwxgeravfq.supabase.co/storage/v1/object/public/vouchers/${data?.voucher_url}`}
              alt="Comprobante de pago"
              onClose={onCloseVoucher}
            />
          )}
        </form>
      )}
    </Formik>
  );
};

export default OrderDescriptionCard;
