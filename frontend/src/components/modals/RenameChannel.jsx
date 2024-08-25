import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createSchemaValidationRenameChannel } from './validate';
import {
  changeChannel,
  setChannelModal,
  selectModalChannelName,
  selectChannelId,
} from '../../store/slice/appSlice';
import { useEditChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import filterText from '../../utils/filterText';

const RenameChannel = (props) => {
  const { handleClose } = props;
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const modalChannelName = useSelector(selectModalChannelName);
  const channelId = useSelector(selectChannelId);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const validationSchema = createSchemaValidationRenameChannel(channelNames, t);
  const [editChannel] = useEditChannelMutation();
  const renameChannel = async (values) => {
    const { id, name } = values;
    await editChannel({ id, name: filterText(name) });
    dispatch(setChannelModal({ modalName: '', id: '' }));
    dispatch(changeChannel(values));
    toast.success(t('toast.renameChannel'));
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: modalChannelName,
            id: channelId,
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={renameChannel}
        >
          {({
            errors, handleSubmit, handleChange, isValid, values,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                ref={inputRef}
                className={`form-control ${!isValid ? 'mb-2 is-invalid' : 'mb-2'}`}
                id="name"
              />

              <Form.Label className="visually-hidden" htmlFor="name">{t('modal.label')}</Form.Label>
              {!isValid && <Form.Control.Feedback className="invalid-feedback">{errors.name}</Form.Control.Feedback>}
              <div className="d-flex justify-content-end">
                <div className="me-2">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                  >
                    {t('modal.cancel')}
                  </Button>
                </div>
                <Button
                  type="submit"
                  variant="primary"
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

export default RenameChannel;
