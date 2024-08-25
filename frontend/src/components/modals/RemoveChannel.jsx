import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { changeChannel, setChannelModal } from '../../store/slice/appSlice';

const RemoveChannel = (props) => {
  const dispatch = useDispatch();
  const { channelId, currentChannelId, t } = props;
  const [removeChannel] = useRemoveChannelMutation();
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
  const handleClose = () => dispatch(setChannelModal({ modalName: '', id: '' }));

  return (
    <Modal show onHide={handleClose} centered>
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
    </Modal>
  );
};

export default RemoveChannel;
