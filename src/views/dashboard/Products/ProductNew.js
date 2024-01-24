import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MainCard from '../../../ui-component/cards/MainCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductDetailForm from '../../pages/products/ProductDetailForm';
import { insertEntity, uploadFile } from '../../../services/methods';
import { useUser } from '@supabase/auth-helpers-react';
import { IMAGE_URL } from '../../../utils/constants';
import { mutate } from 'swr';

const ENTITY_NAME = 'products';

const ProductNew = () => {
  const navigation = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const user = useUser();
  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    if (selectedImage) {
      setSubmitting(true);
      const { data: imageData, error: errorImage } = await uploadFile(uuidv4(), selectedImage);
      console.log(imageData);
      if (errorImage) {
        setErrors({ submit: 'Ha ocurrido un error, vuelva a intentarlo' });
        console.log(errorImage);
        return;
      }

      const { error } = await insertEntity(ENTITY_NAME, { ...values, imageUrl: IMAGE_URL + imageData.path });
      if (error) {
        setErrors({ submit: 'Ha ocurrido un error, vuelva a intentarlo' });
        setStatus({ success: false });
        setSubmitting(false);
        toast.error('Error al crear el producto');
        return;
      }

      setStatus({ success: true });
      setSubmitting(false);

      toast.success('Producto creado correctamente');
      mutate(`/products`);
      navigation('/products');
      return;
    }
  };

  return (
    <MainCard title="Añadir Nuevo Producto">
      <ProductDetailForm selectedImage={selectedImage} setSelectedImage={setSelectedImage} onSubmit={onSubmit} />
    </MainCard>
  );
};

export default ProductNew;
