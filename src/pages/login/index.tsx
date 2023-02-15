import React, { useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';

import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import UsersService from '../../services/server/users/user.service';
import { ICreateUser } from '../../interfaces/IUsers';

const CustomTextField = styled(TextField)`
  & label.MuiOutlinedInput {
    color: #e8e6e3;
  }
  & .MuiOutlinedInput-root {
    &.MuiOutlinedInput-root fieldset {
      color: #e8e6e3;
      border-color: #e8e6e3;
    }
  }
  & .MuiFormLabel-root {
    color: #e8e6e3;
  }
  & .MuiInputBase-input {
    color: #e8e6e3;
  }
  & .MuiFormHelperText-root {
    color: #ffb4b4;
  }
`;

const registerSchema = yup.object().shape({
  name: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(6, 'Too short! Must be at least 6 characters long')
    .required('Required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Must match password')
    .required('Required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

const registerInitialValues = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
const loginInitialValues = { email: '', password: '' };

type IFormTypes = 'login' | 'register';

const Login = () => {
  const [formType, setFormType] = useState<IFormTypes>('login');

  const navigate = useNavigate();
  const { Login } = useAuth();

  const changeFormType = () => {
    formType === 'login' ? setFormType('register') : setFormType('login');
  };

  const handleLogin = async (login: { email: string; password: string }) => {
    await Login(login);
    navigate('/');
  };

  const handleRegister = async (newUser: ICreateUser) => {
    const registered = await UsersService.create(newUser);
    registered && changeFormType();
  };

  return (
    <div className={style.container}>
      <Paper className={style.paper}>
        <h1
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#b1b6b5',
          }}
          onClick={changeFormType}
        >
          {formType === 'login' ? (
            <>
              <p className={style.formTypeSelected}>Login</p> /Register
            </>
          ) : (
            <>
              Login/ <p className={style.formTypeSelected}>Register</p>
            </>
          )}
        </h1>
        {formType === 'register' ? (
          <Formik
            initialValues={registerInitialValues}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form className={style.paper}>
                <div style={{ gap: '12px', display: 'flex' }}>
                  <CustomTextField
                    id='name'
                    label='Name'
                    variant='outlined'
                    size='small'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name !== '' && touched.name ? errors.name : ''}
                  />
                  <CustomTextField
                    id='lastName'
                    label='Last Name'
                    variant='outlined'
                    size='small'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.lastName !== '' && touched.lastName ? errors.lastName : ''}
                  />
                </div>
                <CustomTextField
                  id='email'
                  label='Email'
                  variant='outlined'
                  size='small'
                  sx={{ width: '100%' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email !== '' && touched.email ? errors.email : ''}
                />
                <div style={{ gap: '12px', display: 'flex' }}>
                  <CustomTextField
                    id='password'
                    label='Password'
                    variant='outlined'
                    size='small'
                    type={'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password !== '' && touched.password ? errors.password : ''}
                  />
                  <CustomTextField
                    id='passwordConfirmation'
                    label='Password Confirmation'
                    variant='outlined'
                    size='small'
                    type={'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.passwordConfirmation !== '' && touched.passwordConfirmation
                        ? errors.passwordConfirmation
                        : ''
                    }
                  />
                </div>
                <Button variant='contained' type='submit' sx={{ width: '40%' }}>
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginSchema}
            validateOnChange
            onSubmit={handleLogin}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form className={style.paper}>
                <div style={{ gap: '12px', display: 'flex' }}>
                  <CustomTextField
                    id='email'
                    name='email'
                    label='Email'
                    variant='outlined'
                    size='small'
                    sx={{ width: '60%' }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email !== '' && touched.email ? errors.email : ''}
                  />
                  <CustomTextField
                    id='password'
                    name='password'
                    label='Password'
                    variant='outlined'
                    size='small'
                    type={'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password !== '' && touched.password ? errors.password : ''}
                  />
                </div>
                <Button variant='contained' sx={{ width: '40%' }} type='submit'>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Paper>
    </div>
  );
};

export default Login;
