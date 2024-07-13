import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAddMessageMutation } from '../api/chatApi';

const MessageForm = () => {
  const { t } = useTranslation();
  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const sendMessage = async (values, { setSubmitting, resetForm }) => {
    try {
      await addMessage({ body: values.body, channelId: currentChannelId });
      resetForm();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={sendMessage}
      >
        {({ isSubmitting }) => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                type="text"
                name="body"
                placeholder={t('messageForm.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                autoFocus
                required
              />
              <button
                type="submit"
                className="btn btn-outline-secondary"
                disabled={isAddingMessage && isSubmitting}
              >
                {t('messageForm.button')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
