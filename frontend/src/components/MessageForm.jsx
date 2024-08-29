import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAddMessageMutation } from '../api/messagesApi';
import filterText from '../utils/filterText';
import { selectUsername } from '../store/slice/authSlice';
import { selectCurrentChannelId } from '../store/slice/appSlice';

const MessageForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const username = useSelector(selectUsername);
  const sendMessage = async (values, { setSubmitting, resetForm }) => {
    try {
      const { message } = values;
      const data = {
        message: filterText(message),
        channelId: currentChannelId,
        username,
      };
      await addMessage(data);
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
