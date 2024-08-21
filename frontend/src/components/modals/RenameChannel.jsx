import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import createSchemaValidation from '../../utils/createSchemaValidation';
import { changeChannel } from '../../store/slice/appSlice';
import { useEditChannelMutation } from '../../api/channelsApi';
import filteredText from '../../utils/filteredText';

const RenameChannel = (props) => {
  const inputRef = useRef(null);
  const {
    addChannelSchema, handleCloseModal, dispatch, modalId, currentChannelName, t, channelNames,
    modalChannelName,
  } = props;
  const validationSchema = createSchemaValidation(channelNames, t);
  const [editChannel] = useEditChannelMutation();
  const renameChannel = async (values) => {
    const { id, name } = values;
    await editChannel({ id, name: filteredText(name) });
    handleCloseModal();
    dispatch(changeChannel(values));
    toast.success(t('toast.renameChannel'));
  };
  useEffect(() => {
    const test = 'my-test';
    console.log(test);
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  useEffect(
    () => {
      const myProps = props;
      console.log(myProps);
      inputRef.current.select();
    },
    [addChannelSchema, handleCloseModal, dispatch, modalId, currentChannelName],
  );

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: modalChannelName,
            id: modalId,
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
