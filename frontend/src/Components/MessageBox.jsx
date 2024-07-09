import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../api/chatApi';
import socket from '../socket.js';
import Loading from './Spinner.jsx';

const MessageBox = () => {
  const { data: messages, isLoading, refetch } = useGetMessagesQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const filtredMessages = messages?.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    const handleNewMessage = async () => {
      await refetch();
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage');
    };
  }, [refetch]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {isLoading && <Loading />}
      {filtredMessages?.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          :
          {' '}
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
