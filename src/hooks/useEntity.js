import { deleteEntity, getEntities, insertEntity, updateEntity } from '../services/methods';
import useSWR, { mutate } from 'swr';

const useEntity = (entity) => {
  const { data, error, isLoading } = useSWR(entity ? `/${entity}` : null, () => getEntities(entity));

  const deleteProduct = (id) => {
    deleteEntity(entity, id).then(() => mutate(`/${entity}`));
  };

  const insertProduct = async (data) => {
    await insertEntity(entity, data);
  };

  const editProduct = async (id, data) => {
    await updateEntity(entity, { ...data, id });
  };

  return {
    data: data?.data,
    isLoading,
    error,
    insertProduct,
    editProduct,
    deleteProduct
  };
};

export default useEntity;
