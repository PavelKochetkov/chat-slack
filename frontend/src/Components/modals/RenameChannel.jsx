import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { changeChannel } from '../../store/slice/appSlice';
import { useEditChannelMutation } from '../../api/chatApi';

const RenameChannel = (props) => {
  const inputRef = useRef(null);
  const {
    showModal, addChannelSchema, handleCloseModal, dispatch, modalId,
  } = props;
  const [editChannel] = useEditChannelMutation();
  const renameChannel = async (values, { setSubmitting }) => {
    try {
      await editChannel(values);
      handleCloseModal();
      dispatch(changeChannel(values));
      toast.success('Канал переименован');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal show={showModal === 'renaming'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
            id: modalId,
          }}
          validationSchema={addChannelSchema}
          onSubmit={renameChannel}
        >
          {({
            errors, isSubmitting,
          }) => (
            <Form>
              <Field
                name="name"
                className={errors.name ? 'mb-2 form-control is-invalid' : 'mb-2 form-control'}
                innerRef={inputRef}
              />
              {errors.name ? (
                <div className="invalid-feedback">{errors.name}</div>
              ) : null}
              <div className="d-flex justify-content-end">
                <div className="me-2">
                  <Button
                    variant="secondary"
                    onClick={handleCloseModal}
                  >
                    Отменить
                  </Button>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  Отправить
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
