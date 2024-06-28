/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginForm = () => (
  <Formik>
    <Form className="col-12 col-md-6 mt-3 mt-mb-0">

      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <Field
          type="text"
          name="username"
          className="form-control"
          placeholder="Ваш ник"
          id="username"
          required
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
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>

    </Form>
  </Formik>
);
export default LoginForm;
