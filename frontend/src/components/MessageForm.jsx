import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SendFill } from 'react-bootstrap-icons';
import { useAddMessageMutation } from '../api/messagesApi';
import { censorText } from '../utils/textFilter';
import { selectUsername } from '../store/slice/authSlice';
import { selectCurrentChannelId, selectIsSuccses, selectError } from '../store/slice/appSlice';
import handleError from '../utils/handleError';

const MessageForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const isSuccses = useSelector(selectIsSuccses);
  const errorStatus = useSelector(selectError);
  const username = useSelector(selectUsername);

  const sendMessage = async (values, { setSubmitting, resetForm }) => {
    const { message } = values;
    const data = {
      message: censorText(message),
      channelId: currentChannelId,
      username,
    };
    await addMessage(data);
    resetForm();
    inputRef.current.focus();
    setSubmitting(false);
  };

  useEffect(() => {
    if (!isSuccses && errorStatus) {
      const errorMessage = handleError(errorStatus, t);
      toast.error(errorMessage);
    }
  }, [errorStatus, isSuccses, t]);

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
                className="btn me-1"
                disabled={isAddingMessage && isSubmitting}
              >
                <SendFill color="royalblue" size={20} />
                <span className="visually-hidden">{t('messageForm.button')}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
