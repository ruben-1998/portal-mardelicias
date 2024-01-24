import React, { useEffect, useContext } from 'react';
import { mutate } from 'swr';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import MainCard from '../../../ui-component/cards/MainCard';
import UserDetail from '../../pages/users/UserDetailForm';
import useUserDescription from '../../../hooks/useUserDescription';
import { USERS_TYPE_DEFINITIONS } from '../../../utils/constants';
import { updateUser } from '../../../services/users/users';
import { UserContext } from 'store/UserContext';

const UserDescription = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const { user, isLoading } = useUserDescription(id);

  const { isAdmin } = useContext(UserContext);
  useEffect(() => {
    if (!isAdmin) {
      navigation('/');
    }
  }, []);

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { error } = await updateUser(id, values);
    if (error) {
      setErrors({ submit: error.message });
      setStatus({ success: false });
      setSubmitting(false);
      toast.error('Error al actualizar el usuario');
      return;
    }

    setStatus({ success: true });
    setSubmitting(false);

    toast.success('Usuario actualizado correctamente');
    mutate(`/user/${id}`);
    navigation('/users');
  };

  if (isLoading) return null;

  return (
    <MainCard title="Descripción del Usuario">
      <UserDetail
        onSubmit={onSubmit}
        initialValues={{
          ...user?.user_metadata,
          email: user?.email,
          phone: `0${user?.phone}`,
          role: user?.user_metadata?.role ?? USERS_TYPE_DEFINITIONS.WINEMARKER,
          password: user?.password,
          submit: null
        }}
      />
    </MainCard>
  );
};

export default UserDescription;
