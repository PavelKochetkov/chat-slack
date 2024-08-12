import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../../api/channelsApi.js';
import { changeChannel } from '../../store/slice/appSlice.js';
import filteredText from '../../utils/filteredText.js';

const NewChannel = (props) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const {
    showModal, addChannelSchema, handleCloseModal, dispatch,
  } = props;
  const [addChannel] = useAddChannelMutation();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await addChannel({ name: filteredText(values.name) });
      const { id, name } = response.data;
      handleCloseModal();
      dispatch(changeChannel({ id, name }));
      toast.success(t('toast.newChannel'));
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
  }, [inputRef]);

  return (
    <Modal show={showModal === 'adding'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.titleAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={addChannelSchema}
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
                autoFocus
                id="name"
              />
              <label className="visually-hidden" htmlFor="name">{t('modal.label')}</label>
              {!isValid && <div className="invalid-feedback">{errors.name}</div>}
              <div className="d-flex justify-content-end">
                <div className="me-2">
                  <Button variant="secondary" onClick={handleCloseModal}>{t('modal.cancel')}</Button>
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
    </Modal>
  );
};

export default NewChannel;
