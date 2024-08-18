import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { selectAuthError } from '../store/slice/authSlice';
import { useCreateNewUserMutation } from '../api/authApi';
import filteredText from '../utils/filteredText';
import getRoute from '../utils/routes';

const SignupForm = (props) => {
  const { signupSchema } = props;
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');
  const [isErrorRegistration, setIsErrorRegistration] = useState(false);
  const [createNewUser] = useCreateNewUserMutation();
  const error = useSelector(selectAuthError);
  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const { username, password } = values;
      const data = {
        username: filteredText(username),
        password,
      };
      await createNewUser(data);
      navigate(getRoute('PAGE_CHAT'));
    } catch {
      switch (error.status) {
        case 409: {
          setIsErrorRegistration(!isErrorRegistration);
          setRegistrationError(t('errors.userExists'));
          setSubmitting(false);
          break;
        }
        case 'FETCH_ERROR': {
          setIsErrorRegistration(!isErrorRegistration);
          toast.error(t('toast.networkError'));
          setSubmitting(false);
          break;
        }
        default: {
          setRegistrationError(t('errors.userExists'));
          setSubmitting(false);
          break;
        }
      }
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
