import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../api/chatApi.js';
import { changeChannel } from '../store/slice/appSlice.js';
import Loading from './Spinner.jsx';
import socket from '../socket.js';
import ModalContainer from './modals/index.js';

const ChannelSidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: channels, isLoading, refetch } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (channels && currentChannelId === 1) {
      const { id, name } = channels[0];
      dispatch(changeChannel({ id, name }));
    }
  }, [channels, currentChannelId, dispatch]);
  const hadleChannelClick = (id, name) => {
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
    }
  };
  useEffect(() => {
    const handleNewChannel = async () => {
      await refetch();
    };

    socket.on('newChannel', handleNewChannel);

    return () => {
      socket.off('newChannel');
    };
  }, [refetch]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        {isLoading && <Loading />}
        <button onClick={handleShow} type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            <span className="visually-hidden">+</span>
          </svg>
        </button>
      </div>
      <ModalContainer show={show} handleClose={handleClose} />
      <ul id="channel-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => {
          const styleButton = channel.id === currentChannelId ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn';
          return (
            <li key={channel.id} className="nav-item w-100">
              <button
                type="button"
                className={styleButton}
                onClick={() => hadleChannelClick(channel.id, channel.name)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelSidebar;
