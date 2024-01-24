import { supabase } from '../client';
import { USERS_TYPE_DEFINITIONS } from '../../utils/constants';

const ENTITY_NAME = 'users';

export const getAllUsers = async () => {
  return await supabase.auth.admin.listUsers();
};

export const getOneUser = async (id) => {
  return await supabase.auth.admin.getUserById(id);
};

export const createUser = async (data) => {
  let newPhone = data?.phone;
  if (data?.phone.charAt(0) === '0') {
    newPhone = data?.phone.substring(1);
  }
  return await supabase.auth.admin.createUser({
    email: data?.email,
    password: data?.password,
    phone: newPhone,
    email_confirm: true,
    user_metadata: {
      dni: data?.dni,
      first_name: data?.first_name,
      last_name: data?.last_name,
      city: data?.city,
      direction: data?.direction,
      direction_detail: data?.direction_detail,
      role: data?.role
    }
  });
};

export const updateUser = async (id, data) => {
  let newPhone = data?.phone;
  if (data?.phone.charAt(0) === '0') {
    newPhone = data?.phone.substring(1);
  }

  return await supabase.auth.admin.updateUserById(id, {
    email: data?.email,
    password: data?.password,
    phone: newPhone,
    email_confirm: true,
    user_metadata: {
      dni: data?.dni,
      first_name: data?.first_name,
      last_name: data?.last_name,
      city: data?.city,
      direction: data?.direction,
      direction_detail: data?.direction_detail,
      role: data?.role
    }
  });
};

export const getAllDeliveryUsers = async () =>
  await supabase.from(ENTITY_NAME).select(`id, first_name, last_name`).eq('role', USERS_TYPE_DEFINITIONS.DRIVER);
