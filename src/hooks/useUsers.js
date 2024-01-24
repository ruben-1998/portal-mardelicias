import { getAllUsers } from '../services/users/users';
import useSWR from 'swr';

const useUsers = () => {
  const { data, error, isLoading } = useSWR(`/users`, () => getAllUsers());

  return {
    users: data?.data?.users,
    isLoading,
    error
  };
};

export default useUsers;
