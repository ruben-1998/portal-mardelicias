import React, { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import ProductDetailForm from '../../pages/products/ProductDetailForm';
import MainCard from '../../../ui-component/cards/MainCard';

import { updateEntity } from '../../../services/methods';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';
import BankDetailForm from 'views/pages/banks/BankDetailForm';
import useBankDescription from 'hooks/useBankDescription';
import { useContext } from 'react';
import { UserContext } from 'store/UserContext';
import { useEffect } from 'react';

const BankDetails = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (!isAdmin) {
      navigation('/');
    }
  }, []);

  const { data, isLoading } = useBankDescription(id);

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    setSubmitting(true);

    const { error } = await updateEntity('bank_accounts', { id, ...values });

    if (error) {
      setErrors({ submit: error.message });
      setStatus({ success: false });
      setSubmitting(false);
      toast.error('Error al actualizar el banco');
      return;
    }
    setStatus({ success: true });
    setSubmitting(false);
    mutate('/bank_accounts');
    mutate(`/bank_accounts/${id}`);
    toast.success('Banco actualizado correctamente');
    navigation('/banks');
  };

  if (isLoading) return null;

  return (
    <MainCard title="Descripción del Banco">
      <BankDetailForm
        onSubmit={onSubmit}
        initialValues={{
          ...data
        }}
      />
    </MainCard>
  );
};

export default BankDetails;
