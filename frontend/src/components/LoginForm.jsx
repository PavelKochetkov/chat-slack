import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectAuthError } from '../store/slice/authSlice';
import { useLoginMutation } from '../api/authApi';
import getRoute from '../utils/routes';

const LoginForm = () => {
  const [loginError, setLoginError] = useState('');
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const error = useSelector(selectAuthError);
  const handleLogin = async (values) => {
    try {
      await login(values).unwrap();
      navigate(getRoute('PAGE_CHAT'));
    } catch {
      switch (error.status) {
        case 401: {
          setLoginError(t('errors.login'));
          break;
        }
        case 'FETCH_ERROR': {
          toast.error(t('toast.networkError'));
          break;
        }
        default: {
          setLoginError(t('errors.login'));
          break;
        }
      }
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
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
