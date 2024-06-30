import React from 'react';
import HeaderMessageContainer from './HeaderMessageContainer';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';

const MessageContainer = ({ messages }) => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <HeaderMessageContainer />
      <MessageBox messages={messages} />
      <MessageForm />
    </div>
  </div>
);

export default MessageContainer;
