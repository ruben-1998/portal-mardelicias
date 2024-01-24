import useSWR from 'swr';
import { getEntity } from '../services/methods';

const useProductDescription = (id) => {
  const entity = 'products';
  const { data, error, isLoading } = useSWR(id ? `/products/${id}` : null, () => getEntity(entity, id));
  return {
    data: data?.data[0] ?? null,
    isLoading,
    error
  };
};

export default useProductDescription;
