import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, Input, InputLabel, OutlinedInput } from '@mui/material';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

import { Formik } from 'formik';
import * as Yup from 'yup';

const Container = styled('div')`
  .description {
    margin-top: 0.75rem !important;
  }
`;

const BankDetailForm = ({ initialValues, onSubmit }) => {
  const theme = useTheme();

  const validations = Yup.object().shape({
    id_number: Yup.string().required('El número de identificación es requerido'),
    account_name: Yup.string().min(3, 'El nombre debe contener más de 3 letras').required('El nombre de la cuenta es requerida'),
    bank_name: Yup.string().min(3, 'El nombre debe contener más de 3 letras').required('El nombre del banco es requerido'),
    account_number: Yup.string().required('El numero de cuenta es requerido'),
    account_type: Yup.string().required('El tipo de cuenta es requerido')
  });

  return (
    <Container>
      <Formik
        initialValues={
          initialValues ?? {
            account_name: '',
            id_number: '',
            bank_name: '',
            account_number: '',
            account_type: ''
          }
        }
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.id_number && errors.id_number)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-id_number">Numero de identificación</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-id_number"
                    type="tel"
                    value={values.id_number}
                    name="id_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Numero de identificación"
                  />
                  {touched.id_number && errors.id_number && (
                    <FormHelperText error id="standard-weight-helper-text-id_number">
                      {errors.id_number}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.account_name && errors.account_name)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-stock">Nombre de la Cuenta</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-account_name"
                    type="text"
                    value={values.account_name}
                    name="account_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Nombre de la Cuenta"
                  />
                  {touched.account_name && errors.account_name && (
                    <FormHelperText error id="standard-weight-helper-text-account_name">
                      {errors.account_name}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.bank_name && errors.bank_name)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-description">Nombre del Banco</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-bank_name"
                    type="text"
                    value={values.bank_name}
                    name="bank_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Descripción"
                  />
                  {touched.bank_name && errors.bank_name && (
                    <FormHelperText error id="standard-weight-helper-text-bank_name">
                      {errors.bank_name}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.account_type && errors.account_type)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-account_type">Tipo de Cuenta</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-account_type"
                    type="text"
                    value={values.account_type}
                    name="account_type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Tipo de Cuenta"
                  />
                  {touched.account_type && errors.account_type && (
                    <FormHelperText error id="standard-weight-helper-text-account_type">
                      {errors.account_type}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.account_number && errors.account_number)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-account_number">Numero de Cuenta</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-account_number"
                    type="tel"
                    value={values.account_number}
                    name="account_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Numero de Cuenta"
                  />
                  {touched.account_number && errors.account_number && (
                    <FormHelperText error id="standard-weight-helper-text-account_number">
                      {errors.account_number}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
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

export default BankDetailForm;
