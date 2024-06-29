import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatData } from '../slices/chatSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => console.log('state', state));
  console.log('channels', channels);

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);
  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
};

export default ChatPage;
