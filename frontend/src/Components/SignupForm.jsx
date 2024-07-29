import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const SignupForm = (props) => {
  const { signupSchema } = props;
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { username, password } = values;
          const data = {
            username,
            password,
          };
          const response = await axios.post('/api/v1/signup', data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          navigate('/');
        } catch (error) {
          setRegistrationError(t('errors.userExists'));
          setSubmitting(false);
        }
      }}
    >
      { ({ errors, touched, isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
          {registrationError && <div className="alert alert-danger">{registrationError}</div>}
          <div className="form-floating mb-3">
            <Field
              name="username"
              id="username"
              placeholder={t('errors.range')}
              autoComplete="username"
              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label className="form-label" htmlFor="username">{t('signupPage.username')}</label>
            {errors.username && touched.username ? (
              <div className="invalid-tooltip">{errors.username}</div>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <Field
              name="password"
              id="password"
              type="password"
              placeholder={t('errors.min')}
              autoComplete="new-password"
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
            />
            <label className="form-label" htmlFor="password">{t('signupPage.password')}</label>
            {errors.password && touched.password ? (
              <div className="invalid-tooltip">{errors.password}</div>
            ) : null}
          </div>
          <div className="form-floating mb-3">
            <Field
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder={t('errors.mustMatch')}
              autoComplete="new-password"
              className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
            />
            <label className="form-label" htmlFor="password">{t('signupPage.confirmPassword')}</label>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="invalid-tooltip">{errors.confirmPassword}</div>
            ) : null}
          </div>
          <Button
            type="submit"
            variant="outline-primary w-100"
            disabled={isSubmitting}
          >
            {t('signupPage.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
