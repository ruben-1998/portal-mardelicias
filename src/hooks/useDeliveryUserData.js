import useSWR from 'swr';
import { getAllDeliveryUsers } from '../services/users/users';

const useDeliveryData = () => {
  const { data, isLoading, error } = useSWR(`/delivery`, () => getAllDeliveryUsers());
  return {
    data: data?.data ?? null,
    isLoading,
    error
  };
};

export default useDeliveryData;
