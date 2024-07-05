import React, { useEffect } from 'react';
import { useGetMessagesQuery } from '../api/chatApi';
import socket from '../socket.js';

const MessageBox = () => {
  const { data: messages, isLoading, refetch } = useGetMessagesQuery();

  useEffect(() => {
    const handleNewMessage = async () => {
      await refetch();
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [refetch]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {isLoading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Загрузка...</span></div>}
      {messages && messages.length > 0 && messages.map((message) => (
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
