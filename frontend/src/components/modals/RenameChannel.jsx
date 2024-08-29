import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createSchemaValidationRenameChannel } from './validate';
import {
  selectModalChannelName,
  selectModalChannelId,
  selectIsSuccses,
  selectError,
} from '../../store/slice/appSlice';
import { useEditChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import filterText from '../../utils/filterText';

const RenameChannel = (props) => {
  const { handleClose } = props;
  const inputRef = useRef(null);
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const modalChannelName = useSelector(selectModalChannelName);
  const сhannelId = useSelector(selectModalChannelId);
  const isSuccses = useSelector(selectIsSuccses);
  const errorStatus = useSelector(selectError);
  const { t } = useTranslation();
  const validationSchema = createSchemaValidationRenameChannel(channelNames, t);
  const [editChannel] = useEditChannelMutation();
  const renameChannel = async (values) => {
    const { name } = values;
    const data = {
      name: filterText(name),
      id: сhannelId,
    };
    await editChannel(data).unwrap();
  };

  useEffect(() => {
    if (isSuccses) {
      toast.success(t('toast.сhannelRenamedSuccessfully'));
      handleClose();
    }
  }, [handleClose, isSuccses, t]);

  useEffect(() => {
    if (!isSuccses && errorStatus === 'FETCH_ERROR') {
      toast.error(t('toast.networkError'));
    }
  }, [errorStatus, isSuccses, t]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = modalChannelName;
      inputRef.current.select();
    }
    console.log(inputRef.current.value);
  }, [modalChannelName]);

  useEffect(() => {
    const myProps = props;
    console.log(myProps);
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: modalChannelName,
            id: сhannelId,
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
