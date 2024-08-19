import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { changeChannel } from '../../store/slice/appSlice';
import { useEditChannelMutation } from '../../api/channelsApi';
import filteredText from '../../utils/filteredText';

const RenameChannel = (props) => {
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const inputRef = useRef(null);
  const {
    showModal, addChannelSchema, handleCloseModal, dispatch, modalId,
  } = props;
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const renameChannel = async (values, { setSubmitting }) => {
    try {
      const { id, name } = values;
      await editChannel({ id, name: filteredText(name) });
      handleCloseModal();
      dispatch(changeChannel(values));
      toast.success(t('toast.renameChannel'));
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [currentChannelName]);

  return (
    <Modal show={showModal === 'renaming'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: currentChannelName,
            id: modalId,
          }}
          validationSchema={addChannelSchema}
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
                    onClick={handleCloseModal}
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
    </Modal>
  );
};

export default RenameChannel;
