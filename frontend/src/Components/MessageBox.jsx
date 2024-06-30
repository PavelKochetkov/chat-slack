import React from 'react';
import { useGetMessagesQuery } from '../api/chatApi';

const MessageBox = () => {
  const { data: messages, isLoading } = useGetMessagesQuery();
  console.log(messages);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {isLoading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Загрузка...</span></div>}
      <div className="text-break mb-2">
        <b>admin</b>
        : Тестовое сообщение
      </div>
    </div>
  );
};

export default MessageBox;
