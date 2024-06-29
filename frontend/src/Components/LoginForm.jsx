import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const LoginForm = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const responce = await axios.post('/api/v1/login', values);
          localStorage.setItem('token', responce.data.token);
          navigate('/');
        } catch (error) {
          setLoginError('Ошибка авторизации. Проверьте введенные данные');
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <div className="form-floating mb-3">
            <Field
              type="text"
              name="username"
              className="form-control"
              placeholder="Ваш ник"
              id="username"
              required
              autoFocus
            />
            <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder="Пароль"
              id="password"
              required
            />
            <label className="form-label" htmlFor="password">Пароль</label>
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
          >
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
