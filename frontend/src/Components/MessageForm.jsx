import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useAddMessageMutation, useGetMessagesQuery } from '../api/chatApi';

const MessageForm = () => {
  const { refetch } = useGetMessagesQuery();
  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    addMessage({ body: values.body }).then(() => {
      setSubmitting(false);
      resetForm();
      refetch();
    });
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                type="text"
                name="body"
                placeholder="Введите сообщение"
                className="border-0 p-0 ps-2 form-control"
                autoFocus
              />
              <button
                type="submit"
                className="btn btn-outline-secondary"
                disabled={isAddingMessage || isSubmitting}
              >
                Отправить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
