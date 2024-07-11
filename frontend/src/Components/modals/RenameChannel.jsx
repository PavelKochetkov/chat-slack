import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { changeChannel } from '../../store/slice/appSlice';
import { useEditChannelMutation } from '../../api/chatApi';

const RenameChannel = (props) => {
  const {
    showModal, addChannelSchema, handleCloseModal, dispatch, modalId,
  } = props;
  const [editChannel] = useEditChannelMutation();
  const modalNameChannel = useSelector((state) => state.app.modalNameChannel);
  console.log(modalNameChannel);
  const renameChannel = async (values, { setSubmitting }) => {
    try {
      const { name, id } = values;
      const data = {
        name,
        id,
      };
      console.log(values);
      await editChannel(data);
      handleCloseModal();
      dispatch(changeChannel({ name }));
      toast.success('Канал переименован');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

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
              <Field name="name" className={errors.name ? 'mb-2 form-control is-invalid' : 'mb-2 form-control'} />
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
