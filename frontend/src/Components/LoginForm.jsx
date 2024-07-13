import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const LoginForm = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const responce = await axios.post('/api/v1/login', values);
          localStorage.setItem('token', responce.data.token);
          localStorage.setItem('username', responce.data.username);
          navigate('/');
        } catch (error) {
          setLoginError(t('errors.login'));
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <div className="form-floating mb-3">
            <Field
              type="text"
              name="username"
              className="form-control"
              placeholder={t('loginPage.usernamePlaceholder')}
              id="username"
              required
              autoFocus
            />
            <label htmlFor="username">{t('loginPage.userLabel')}</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder={t('loginPage.passwordPlaceholder')}
              id="password"
              required
            />
            <label className="form-label" htmlFor="password">{t('loginPage.passwordLabel')}</label>
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
          >
            {t('loginPage.button')}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
