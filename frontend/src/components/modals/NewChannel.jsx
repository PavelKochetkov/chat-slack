import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../api/channelsApi.js';
import { createSchemaValidationNewChannel } from './validate.js';
import { selectError, selectIsSuccess } from '../../store/slice/appSlice.js';
import { censorText } from '../../utils/textFilter.js';
import handleError from '../../utils/handleError.js';

const NewChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const isSuccess = useSelector(selectIsSuccess);
  const errorStatus = useSelector(selectError);
  const channelNames = channels.map((channel) => channel.name);
  const inputRef = useRef(null);
  const validationSchema = createSchemaValidationNewChannel(channelNames, t);
  const [addChannel] = useAddChannelMutation();

  console.log(isSuccess);

  const createNewChannel = async (values) => {
    const { name } = values;
    const data = {
      name: censorText(name),
    };
    await addChannel(data).unwrap();
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('toast.channelCreatedSuccessfully'));
    }

    if (!isSuccess && errorStatus) {
      const errorMessage = handleError(errorStatus, t);
      toast.error(errorMessage);
    }
  }, [isSuccess, errorStatus, t]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.titleAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={createNewChannel}
        >
          {({
            errors, isSubmitting, isValid,
          }) => (
            <Form>
              <Field
                name="name"
                type="text"
                innerRef={inputRef}
                className={`form-control ${!isValid ? 'mb-2 is-invalid' : 'mb-2'}`}
                id="name"
              />
              <label className="visually-hidden" htmlFor="name">{t('modal.label')}</label>
              {!isValid && <div className="invalid-feedback">{errors.name}</div>}
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={handleClose}
                >
                  {t('modal.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {t('modal.send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default NewChannel;
