import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, Input, InputLabel, OutlinedInput } from '@mui/material';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { DropzoneArea } from 'mui-file-dropzone';
import { Delete, Image } from '@mui/icons-material';

const Container = styled('div')`
  .description {
    margin-top: 0.75rem !important;
  }
`;

const ImageWrapper = styled('div')`
  max-width: 400px;
  position: relative;
  .MuiIconButton-root {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 2;
    background-color: #673ab6;
    color: white;
  }
`;

const CustomImage = styled('img')`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

const CustomDropzoneArea = styled(DropzoneArea)`
  &.drop-zone-product {
    min-height: 100px !important;
  }
`;

const ProductDetailForm = ({ initialValues, onSubmit, setSelectedImage, selectedImage }) => {
  const theme = useTheme();
  const [currentImage, setCurrentImage] = useState('');

  const handleUploadFile = async (file) => {
    if (file[0]) {
      setSelectedImage(file[0]);
    }
  };

  const onRemoveImage = () => {
    setCurrentImage('');
    setSelectedImage(null);
  };

  const validations = Yup.object().shape({
    name: Yup.string().min(3).required('El nombre es requerido'),
    description: Yup.string().min(3).required('La descripción es requerida'),
    price: Yup.number().required('El precio es requerido'),
    stock: Yup.number().required('El stock es requerido')
  });

  useEffect(() => {
    setCurrentImage(initialValues?.imageUrl);
  }, [initialValues, initialValues?.imageUrl]);

  return (
    <Container>
      <Formik
        initialValues={
          initialValues ?? {
            name: '',
            description: '',
            price: 0,
            stock: 0
          }
        }
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid container item xs={12} md={6}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-name">Nombre</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-name"
                      type="text"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Nombre"
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="standard-weight-helper-text-name">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.stock && errors.stock)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-stock">Inventario</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-stock"
                      type="number"
                      value={values.stock}
                      name="stock"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Descripción"
                    />
                    {touched.stock && errors.stock && (
                      <FormHelperText error id="standard-weight-helper-text-stock">
                        {errors.stock}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.description && errors.description)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-description">Descripción</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-description"
                      type="text"
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Descripción"
                      className="description"
                      multiline
                      minRows={5}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error id="standard-weight-helper-text-description">
                        {errors.description}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={6} alignItems="flex-start">
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.price && errors.price)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-price">Precio</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-price"
                      type="number"
                      value={values.price}
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Precio"
                    />
                    {touched.price && errors.price && (
                      <FormHelperText error id="standard-weight-helper-text-price">
                        {errors.price}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.image && errors.image)} sx={{ ...theme.typography.customInput }}>
                    {currentImage && !selectedImage ? (
                      <ImageWrapper>
                        <IconButton onClick={onRemoveImage} type="button">
                          <Delete />
                        </IconButton>
                        <CustomImage src={currentImage} />
                      </ImageWrapper>
                    ) : (
                      <>
                        <CustomDropzoneArea
                          acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
                          filesLimit={1}
                          dropzoneText={'Seleccione o arrastre una imagen para el producto'}
                          onChange={handleUploadFile}
                          dropzoneClass="drop-zone-product"
                          showAlerts={false}
                          maxFileSize={5000000}
                        />
                        {touched.image && errors.image && (
                          <FormHelperText error id="standard-weight-helper-text-image">
                            {errors.image}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
                {!selectedImage && !currentImage && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>Seleccione una imagen para el producto</FormHelperText>
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{ display: 'block' }}
                    >
                      Enviar
                    </Button>
                  </AnimateButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ProductDetailForm;
