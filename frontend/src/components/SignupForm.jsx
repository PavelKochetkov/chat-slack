import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import { useCreateNewUserMutation } from '../api/userApi';
import filteredText from '../utils/filteredText';

const SignupForm = (props) => {
  const { signupSchema } = props;
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');
  const [isErrorRegistration, setIsErrorRegistration] = useState(false);
  const [createNewUser] = useCreateNewUserMutation();
  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const { username, password } = values;
      const data = {
        username: filteredText(username),
        password,
      };
      const response = await createNewUser(data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/');
    } catch (error) {
      setRegistrationError(t('errors.userExists'));
      setIsErrorRegistration(!isErrorRegistration);
      setSubmitting(false);
    }
  };

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
      onSubmit={handleSignup}
    >
      { ({ errors, touched, isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              id="username"
              placeholder={t('errors.range')}
              autoComplete="username"
              className={`form-control ${(errors.username && touched.username) || isErrorRegistration ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label className="form-label" htmlFor="username">{t('signupPage.username')}</label>
            {isErrorRegistration && <div className="invalid-tooltip d-block">{registrationError}</div>}
            {errors.username && touched.username && <div className="invalid-tooltip">{errors.username}</div>}
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
            {errors.password && touched.password && <div className="invalid-tooltip">{errors.password}</div>}
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
            <label className="form-label" htmlFor="confirmPassword">{t('signupPage.confirmPassword')}</label>
            {errors.confirmPassword && touched.confirmPassword && <div className="invalid-tooltip">{errors.confirmPassword}</div>}
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
