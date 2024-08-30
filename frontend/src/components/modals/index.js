import React, { useRef } from 'react';
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
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const showModal = useSelector(selectShowModal);
  const isOpen = useSelector(selectIsOpen);
  const Container = modalsTypes[showModal];
  const inputRef = useRef(null);
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  if (!Container) return null;

  return (
    <Modal show={isOpen} onHide={handleCloseModal} onEntered={handleFocus} centered>
      <Container handleClose={handleCloseModal} inputRef={inputRef} />
    </Modal>
  );
};

export default ModalContainer;
