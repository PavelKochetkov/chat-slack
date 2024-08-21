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

  return (
    <Modal show onHide={() => dispatch(setChannelModal({ modalName: '', id: '' }))} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modal.text')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setChannelModal({ modalName: '', id: '' }))}>
          {t('modal.cancel')}
        </Button>
        <Button variant="danger" onClick={() => deleteChannel(channelId)}>{t('modal.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
