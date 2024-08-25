import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setChannelModal({ modalName: '', id: '' }));
  const showModal = useSelector(selectShowModal);
  const changeModalWindowTitle = () => {
    switch (showModal) {
      case 'adding':
        return t('modal.titleAdd');
      case 'renaming':
        return t('modal.renameChannelTitle');
      default:
        return t('modal.removeChannelTitle');
    }
  };
  const Container = modalsTypes[showModal];
  if (!Container) return null;

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{changeModalWindowTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          handleClose={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
