import React, { useContext, useState, useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import UserDetail from '../../pages/users/UserDetailForm';
import { createUser } from '../../../services/users/users';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'store/UserContext';

const UserNew = () => {
  const navigation = useNavigate();

  const { isAdmin } = useContext(UserContext);
  useEffect(() => {
    if (!isAdmin) {
      navigation('/');
    }
  }, []);

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { error } = await createUser(values);

    if (error) {
      setErrors({ submit: error.message });
      setStatus({ success: false });
      setSubmitting(false);
      toast.error('Error al crear el usuario');
      return;
    }

    setStatus({ success: true });
    setSubmitting(false);

    toast.success('Usuario creado correctamente');
    navigation('/users');
  };

  return (
    <MainCard title="Añadir Nuevo Usuario">
      <UserDetail onSubmit={onSubmit} />
    </MainCard>
  );
};

export default UserNew;
