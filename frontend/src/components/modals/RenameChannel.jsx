import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { changeChannel } from '../../store/slice/appSlice';
import { useEditChannelMutation } from '../../api/channelsApi';
import filteredText from '../../utils/filteredText';

const RenameChannel = (props) => {
  const inputRef = useRef(null);
  const {
    showModal, addChannelSchema, handleCloseModal, dispatch, modalId, currentChannelName,
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
    console.log('useEffect срабатывает');
    if (inputRef.current) {
      console.log('Устанавливаем фокус на инпут');
      console.log('input', inputRef.current);
      inputRef.current.select();
    }
  }, []);

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
            errors, isSubmitting, isValid, values,
          }) => (
            <Form>
              <Field name="name">
                {({ field }) => (
                  <FormControl
                    value={values.name}
                    onChange={field.onChange}
                    type="text"
                    ref={inputRef}
                    className={`form-control ${!isValid ? 'mb-2 is-invalid' : 'mb-2'}`}
                    id="name"
                  />
                )}
              </Field>
              <label className="visually-hidden" htmlFor="name">{t('modal.label')}</label>
              {!isValid && <div className="invalid-feedback">{errors.name}</div>}
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

export default RenameChannel;
