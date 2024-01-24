import { getOneUser } from '../services/users/users';
import useSWR from 'swr';

const useUserDescription = (id) => {
  const { data, error, isLoading } = useSWR(id ? `/user/${id}` : null, () => getOneUser(id));

  return {
    user: data?.data?.user,
    isLoading,
    error
  };
};

export default useUserDescription;
