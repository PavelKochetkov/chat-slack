import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../api/channelsApi.js';
import { createSchemaValidationNewChannel } from './validate.js';
import { changeChannel, setChannelModal } from '../../store/slice/appSlice.js';
import filterText from '../../utils/filterText.js';

const NewChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const validationSchema = createSchemaValidationNewChannel(channelNames, t);
  const [addChannel] = useAddChannelMutation();
  const handleSubmit = async (values) => {
    const response = await addChannel({ name: filterText(values.name) });
    const { id, name } = response.data;
    dispatch(setChannelModal({ modalName: '', id: '' }));
    dispatch(changeChannel({ id, name }));
    toast.success(t('toast.newChannel'));
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
          onSubmit={handleSubmit}
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
                <div className="me-2">
                  <Button variant="secondary" onClick={handleClose}>{t('modal.cancel')}</Button>
                </div>
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
