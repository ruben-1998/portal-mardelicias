import useSWR from 'swr';
import { getEntity } from '../services/methods';

const useBankDescription = (id) => {
  const entity = 'bank_accounts';
  const { data, error, isLoading } = useSWR(id ? `/bank_accounts/${id}` : null, () => getEntity(entity, id));

  return {
    data: data?.data[0] ?? null,
    isLoading,
    error
  };
};

export default useBankDescription;
