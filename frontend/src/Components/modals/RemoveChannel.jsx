import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/chatApi';
import { changeChannel } from '../../store/slice/appSlice';

const RemoveChannel = (props) => {
  const {
    dispatch, showModal, handleCloseModal, modalId,
  } = props;
  const [removeChannel] = useRemoveChannelMutation();
  const deleteChannel = async (id) => {
    try {
      await removeChannel(id);
      handleCloseModal();
      dispatch(changeChannel({ id: 1, name: 'general' }));
      toast.success('Канал удален');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show={showModal === 'remove'} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Отменить
        </Button>
        <Button variant="danger" onClick={() => deleteChannel(modalId)}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
