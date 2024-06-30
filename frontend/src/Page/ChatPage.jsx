import React from 'react';
import ChannelSidebar from '../Components/ChannelSidebar.jsx';
import MessageContainer from '../Components/MessageContainer.jsx';

const ChatPage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelSidebar />
      <MessageContainer />
    </div>
  </div>
);

export default ChatPage;
