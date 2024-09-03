import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectAuthError, selectIsAuthError } from '../store/slice/authSlice';
import { useLoginMutation } from '../api/authApi';
import { generatePageRoute } from '../utils/routes';

const LoginForm = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authError = useSelector(selectAuthError);
  const isAuthError = useSelector(selectIsAuthError);
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.min'))
      .required(t('errors.required')),
  });

  useEffect(() => {
    if (isAuthError && authError === 'FETCH_ERROR') {
      toast.error(t('toast.networkError'));
    }
  }, [isAuthError, authError, t]);

  const handleLogin = async (values) => {
    await login(values).unwrap();
    navigate(generatePageRoute('PAGE_CHAT'));
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={loginSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
          <div className="form-floating mb-3">
            <Field
              type="text"
              name="username"
              className={`form-control ${(errors.username && touched.username) || isAuthError ? 'is-invalid' : ''}`}
              placeholder={t('errors.range')}
              id="username"
              autoFocus
            />
            <label htmlFor="username">{t('loginPage.username')}</label>
            {errors.username && touched.username && <div className="invalid-tooltip">{errors.username}</div>}
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              className={`form-control ${(errors.password && touched.password) || isAuthError ? 'is-invalid' : ''}`}
              placeholder={t('loginPage.password')}
              id="password"
            />
            <label className="form-label" htmlFor="password">{t('loginPage.password')}</label>
            {errors.password && touched.password && <div className="invalid-tooltip">{errors.password}</div>}
            {isAuthError && authError === 401 && <div className="invalid-tooltip">{t('errors.login')}</div>}
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
