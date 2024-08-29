import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { selectShowModal, closeModal, selectIsOpen } from '../../store/slice/appSlice';

const modalsTypes = {
  adding: NewChannel,
  remove: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const handleEntered = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const showModal = useSelector(selectShowModal);
  const isOpen = useSelector(selectIsOpen);
  const Container = modalsTypes[showModal];
  if (!Container) return null;

  return (
    <Modal show={isOpen} onHide={handleCloseModal} onEntered={handleEntered} centered>
      <Container handleClose={handleCloseModal} handleEntered={handleEntered} />
    </Modal>
  );
};

export default ModalContainer;
