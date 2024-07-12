import React from 'react';
import * as Yup from 'yup';
import logo from '../images/avatar.jpg';
import SignupForm from '../Components/SignupForm';

const Signup = () => {
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src={logo} className="rounded-circle" alt="Войти" />
                <SignupForm
                  signupSchema={signupSchema}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
