import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import MainCard from '../../../ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import OrderDescriptionCard from '../../pages/orders/OrderDescriptionCard';
import useOrderDescription from '../../../hooks/useOrderDescription';
import OrderProductsList from '../../pages/orders/OrderProductsList';
import { mutate } from 'swr';
import { updateEntity } from '../../../services/methods';

const OrderDetails = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const { data, isLoading } = useOrderDescription(id);

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const user = values.users;
    delete values.users;
    delete values.orders_driver_user_fkey;
    const { error } = await updateEntity('orders', { id, user_id: user.id, ...values });
    if (error) {
      setErrors({ submit: error.message });
      setStatus({ success: false });
      setSubmitting(false);
      toast.error('Error al actualizar la Orden');
      return;
    }
    setStatus({ success: true });
    setSubmitting(false);

    mutate(`/orders/${id}`);
    mutate('/orders');
    toast.success('Orden actualizada correctamente');
    navigation('/orders');
  };

  if (isLoading) return null;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <MainCard title={`Orden #${id}`}>
          <OrderDescriptionCard data={data} onSubmit={onSubmit} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <MainCard title="Productos">
          <OrderProductsList data={data} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
