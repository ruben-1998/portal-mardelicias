import React, { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import ProductDetailForm from '../../pages/products/ProductDetailForm';
import MainCard from '../../../ui-component/cards/MainCard';

import useProductDescription from '../../../hooks/useProductDescription';
import { removeFile, updateEntity, uploadFile } from '../../../services/methods';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { mutate } from 'swr';
import { IMAGE_URL } from 'utils/constants';

const ProductDetails = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading } = useProductDescription(id);

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    if (selectedImage || data?.imageUrl) {
      setSubmitting(true);
      const { data: imageData, error: errorImage } = await uploadFile(uuidv4(), selectedImage);

      if (errorImage) {
        setErrors({ submit: 'Ha ocurrido un error, vuelva a intentarlo' });
        console.log(errorImage);
        return;
      }

      const resp = await updateEntity('products', {
        id,
        ...values,
        imageUrl: imageData ? IMAGE_URL + imageData.path : data?.imageUrl
      });

      if (imageData && data?.imageUrl !== IMAGE_URL + imageData.path) {
        await removeFile(data?.imageUrl);
      }

      const { data: dataProduct, error } = resp;
      if (error) {
        setErrors({ submit: error.message });
        setStatus({ success: false });
        setSubmitting(false);
        toast.error('Error al actualizar el producto');
        return;
      }
      setStatus({ success: true });
      setSubmitting(false);
      mutate('/products');
      mutate(`/products/${id}`);
      toast.success('Producto actualizado correctamente');
      navigation('/products');
      return;
    }
  };

  if (isLoading) return null;

  return (
    <MainCard title="Descripción del Producto">
      <ProductDetailForm
        onSubmit={onSubmit}
        initialValues={{
          ...data
        }}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
      />
    </MainCard>
  );
};

export default ProductDetails;
