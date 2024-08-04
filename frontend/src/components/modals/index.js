import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { setChannelModal } from '../../store/slice/appSlice';
import { useGetChannelsQuery } from '../../api/chatApi';

const modalsTypes = {
  adding: NewChannel,
  remove: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const modalId = useSelector((state) => state.app.modalId);
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const addChannelSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required'))
      .notOneOf(channelNames, t('errors.unique')),
  });
  const handleCloseModal = () => {
    dispatch(setChannelModal({ modalName: '', id: '' }));
  };
  const showModal = useSelector((state) => state.app.showModal);
  const Container = modalsTypes[showModal];
  if (!Container) return null;

  return (
    <Container
      dispatch={dispatch}
      addChannelSchema={addChannelSchema}
      currentChannelId={currentChannelId}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      modalId={modalId}
    />
  );
};

export default ModalContainer;
