import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { dniRegExp, USERS_TYPE } from '../../../utils/constants';

const Container = styled('div')({
  '& .MuiInputBase-inputMultiline': {
    paddingTop: '1.5rem'
  }
});

const UserDetailForm = ({ initialValues, onSubmit }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validations = Yup.object().shape({
    dni: Yup.string().matches(dniRegExp, 'El número de cédula es invalido').required('El número de cédula'),
    first_name: Yup.string().min(3, 'El nombre debe tener minimo 3 caracteres').required('El nombre es requerido'),
    last_name: Yup.string().min(3, 'El apellido debe tener minimo 3 caracteres').required('El apellido es requerido'),
    phone: Yup.string().min(10).max(10).required('El número de celular es requerido'),
    email: Yup.string().email('El email debe ser valido').max(255).required('El email es requerido'),
    password: Yup.string().max(255).required('La contraseña es requerida'),
    role: Yup.string().required('El tipo de usuario es requerido'),
    city: Yup.string().required('La ciudad es requerida'),
    direction: Yup.string().required('La dirección es requerida'),
    direction_detail: Yup.string().required('El detalle de la dirección es requerida')
  });

  return (
    <Container>
      <Formik
        initialValues={
          initialValues ?? {
            dni: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: '',
            role: '',
            city: '',
            direction: '',
            direction_detail: '',
            submit: null
          }
        }
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.dni && errors.dni)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-dni">Cédula</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-dni"
                    type="tel"
                    value={values.dni}
                    name="dni"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Cédula"
                  />
                  {touched.dni && errors.dni && (
                    <FormHelperText error id="standard-weight-helper-text-dni">
                      {errors.dni}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-first-name">Nombre</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-first-name"
                    type="text"
                    value={values.first_name}
                    name="first_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Nombre"
                  />
                  {touched.first_name && errors.first_name && (
                    <FormHelperText error id="standard-weight-helper-text-first-name">
                      {errors.first_name}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.last_name && errors.last_name)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-last-name">Apellido</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-last-name"
                    type="text"
                    value={values.last_name}
                    name="last_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Apellido"
                  />
                  {touched.last_name && errors.last_name && (
                    <FormHelperText error id="standard-weight-helper-text-last-name">
                      {errors.last_name}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-phone">Teléfono</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone"
                    type="tel"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Teléfono"
                    inputProps={{ prefix: '593' }}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="standard-weight-helper-text-phone">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.role && errors.role)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-role">Tipo de usuario</InputLabel>
                  <Select
                    labelId="outlined-adornment-role"
                    id="demo-simple-select"
                    value={values.role}
                    name="role"
                    label="Tipo de usuario"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ '& .MuiSelect-select': { padding: '30.5px 14px 11.5px' } }}
                  >
                    {USERS_TYPE?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.role && errors.role && (
                    <FormHelperText error id="standard-weight-helper-text-role">
                      {errors.role}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.city && errors.city)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-city">Ciudad</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-city"
                    type="text"
                    value={values.city}
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Ciudad"
                  />
                  {touched.city && errors.city && (
                    <FormHelperText error id="standard-weight-helper-text-city">
                      {errors.city}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.direction && errors.direction)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-direction">Dirección</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-direction"
                    type="text"
                    value={values.direction}
                    name="direction"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Dirección"
                  />
                  {touched.direction && errors.direction && (
                    <FormHelperText error id="standard-weight-helper-text-direction">
                      {errors.direction}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.direction_detail && errors.direction_detail)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-direction_detail">Detalle de la Dirección</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-direction_detail"
                    type="text"
                    value={values.direction_detail}
                    name="direction_detail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Dirección"
                    multiline
                    minRows={4}
                  />
                  {touched.direction_detail && errors.direction_detail && (
                    <FormHelperText error id="standard-weight-helper-text-direction_detail">
                      {errors.direction_detail}
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

export default UserDetailForm;
