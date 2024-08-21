import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { changeChannel } from '../../store/slice/appSlice';

const RemoveChannel = (props) => {
  const {
    dispatch, handleCloseModal, modalId, currentChannelId,
  } = props;
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();
  const deleteChannel = async (id) => {
    try {
      await removeChannel(id);
      handleCloseModal();
      if (modalId === currentChannelId) {
        dispatch(changeChannel({ id: 1, name: 'general' }));
      }
      toast.success(t('toast.removeChannel'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modal.text')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          {t('modal.cancel')}
        </Button>
        <Button variant="danger" onClick={() => deleteChannel(modalId)}>{t('modal.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
