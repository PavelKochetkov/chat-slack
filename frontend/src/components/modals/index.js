import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { useGetChannelsQuery } from '../../api/channelsApi';

const modalsTypes = {
  adding: NewChannel,
  remove: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const channelId = useSelector((state) => state.app.channelId);
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const modalChannelName = useSelector((state) => state.app.modalChannelName);
  const showModal = useSelector((state) => state.app.showModal);
  const Container = modalsTypes[showModal];
  if (!Container) return null;

  return (
    <Container
      channelNames={channelNames}
      currentChannelId={currentChannelId}
      modalChannelName={modalChannelName}
      channelId={channelId}
      t={t}
    />
  );
};

export default ModalContainer;
