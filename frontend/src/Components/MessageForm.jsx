import React from 'react';
import { Formik, Form, Field } from 'formik';

const MessageForm = () => (
  <div className="mt-auto px-5 py-3">
    <Formik
      initialValues={{ text: '' }}
    >
      {({ isSubmitting }) => (
        <Form className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <Field
              type="text"
              name="text"
              placeholder="Введите сообщение"
              className="border-0 p-0 ps-2 form-control"
              autoFocus
              id="text"
            />
            <button
              type="submit"
              className="btn btn-outline-secondary"
              disabled={isSubmitting}
            >
              Отправить
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default MessageForm;
