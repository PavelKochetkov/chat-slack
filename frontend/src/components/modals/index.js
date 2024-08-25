import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { setChannelModal, selectShowModal } from '../../store/slice/appSlice';

const modalsTypes = {
  adding: NewChannel,
  remove: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setChannelModal({ modalName: '', id: '' }));
  const handleEntered = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  const showModal = useSelector(selectShowModal);
  const Container = modalsTypes[showModal];
  if (!Container) return null;

  return (
    <Modal show onHide={handleClose} onEntered={handleEntered} centered>
      <Container
        handleClose={handleClose}
      />
    </Modal>
  );
};

export default ModalContainer;
