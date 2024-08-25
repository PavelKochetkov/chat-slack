import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import {
  changeChannel,
  setChannelModal,
  selectCurrentChannelId,
  selectChannelId,
} from '../../store/slice/appSlice';

const RemoveChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const channelId = useSelector(selectChannelId);
  const deleteChannel = async (id) => {
    try {
      await removeChannel(id);
      dispatch(setChannelModal({ modalName: '', id: '' }));
      if (channelId === currentChannelId) {
        dispatch(changeChannel({ id: 1, name: 'general' }));
      }
      toast.success(t('toast.removeChannel'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modal.text')}
        <div className="d-flex justify-content-end">
          <div className="me-2">
            <Button variant="secondary" onClick={handleClose}>
              {t('modal.cancel')}
            </Button>
          </div>
          <Button variant="danger" onClick={() => deleteChannel(channelId)}>{t('modal.remove')}</Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
