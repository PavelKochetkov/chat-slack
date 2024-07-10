import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import NewChannel from './NewChannel';
import { setChannelModal } from '../../store/slice/appSlice';
import { useGetChannelsQuery } from '../../api/chatApi';

const modals = {
  adding: NewChannel,
};

const ModalContainer = (props) => {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const addChannelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });
  const handleCloseModal = () => {
    dispatch(setChannelModal({ modalName: '' }));
  };
  const showModal = useSelector((state) => state.app.showModal);
  const Container = modals[showModal];
  if (!Container) return null;

  return (
    <Container
      dispatch={dispatch}
      addChannelSchema={addChannelSchema}
      currentChannelId={currentChannelId}
      handleClose={handleClose}
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default ModalContainer;
