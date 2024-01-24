import useSWR from 'swr';
import { getOrder } from '../services/orders/orders';
import { getAllDeliveryUsers } from '../services/users/users';

const useOrderDescription = (id) => {
  const { data, error, isLoading } = useSWR(id ? `/orders/${id}` : null, () => getOrder(id));
  return {
    data: data?.data[0] ?? null,
    isLoading,
    error
  };
};

export default useOrderDescription;
