import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAddMessageMutation } from '../api/messagesApi';
import filteredText from '../utils/filteredText';
import { selectUsername } from '../store/slice/authSlice';

const MessageForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const username = useSelector(selectUsername);
  const sendMessage = async (values, { setSubmitting, resetForm }) => {
    try {
      const { message } = values;
      await addMessage({
        message: filteredText(message),
        channelId: currentChannelId,
        username,
      });
      resetForm();
      inputRef.current.focus();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ message: '' }}
        onSubmit={sendMessage}
      >
        {({ isSubmitting }) => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                type="text"
                name="message"
                placeholder={t('messageForm.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                autoFocus
                required
                innerRef={inputRef}
                aria-label={t('messageForm.label')}
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
