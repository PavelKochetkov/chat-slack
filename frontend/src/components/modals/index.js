import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { setChannelModal } from '../../store/slice/appSlice';
import { useGetChannelsQuery } from '../../api/channelsApi';

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
  const currentChannelName = useSelector((state) => state.app.currentChannelName);
  const modalChannelName = useSelector((state) => state.app.modalChannelName);
  const handleCloseModal = () => {
    dispatch(setChannelModal({ modalName: '', id: '' }));
  };
  const showModal = useSelector((state) => state.app.showModal);
  const Container = modalsTypes[showModal];
  if (!Container) return null;

  return (
    <Container
      dispatch={dispatch}
      channelNames={channelNames}
      currentChannelId={currentChannelId}
      currentChannelName={currentChannelName}
      modalChannelName={modalChannelName}
      handleCloseModal={handleCloseModal}
      modalId={modalId}
      t={t}
    />
  );
};

export default ModalContainer;
