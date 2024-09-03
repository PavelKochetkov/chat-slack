import React from 'react';
import Header from './Header';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';

const MessageContainer = () => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <Header />
      <MessageBox />
      <MessageForm />
    </div>
  </div>
);

export default MessageContainer;
