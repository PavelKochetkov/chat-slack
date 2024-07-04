import React, { useState, useEffect } from 'react';
import { useGetMessagesQuery, useGetChannelsQuery } from '../api/chatApi.js';

const HeaderMessageContainer = () => {
  const [countMessage, setCountMessage] = useState(0);
  const { data: messages } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();
  console.log(channels);
  console.log(messages);

  useEffect(() => {
    if (messages) {
      setCountMessage(messages.length);
    }
  }, [messages]);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># general</b>
      </p>
      <span className="text-muted">
        {countMessage}
        {' '}
        сообщений
      </span>
    </div>
  );
};

export default HeaderMessageContainer;
