import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { changeChannel, setChannelModal } from '../store/slice/appSlice';

const DropdownButton = ({ data }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.app.currentChannelId);
  const handleShowModal = (modalName, channel = { id: '', name: '' }) => {
    dispatch(setChannelModal({ modalName, id: channel.id, name: channel.name }));
  };
  const switchChannel = () => {
    const { id, name } = data;
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id, name }));
    }
  };
  const isActive = data.id === currentChannelId;
  const buttonClass = isActive ? 'secondary' : '';

  return data.removable ? (
    <ButtonGroup className="d-flex" role="group">
      <Button onClick={switchChannel} variant={buttonClass} className="w-100 text-start text-truncate rounded-0">
        <span className="me-1">#</span>
        {data.name}
      </Button>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant={buttonClass} id="channel-management-dropdown" className="flex-grow-0">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleShowModal('remove', data)}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => handleShowModal('renaming', data)}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  ) : (
    <ButtonGroup className="d-flex" role="group">
      <Button onClick={switchChannel} variant={buttonClass} className="w-100 text-start text-truncate rounded-0">
        <span className="me-1">#</span>
        {data.name}
      </Button>
    </ButtonGroup>
  );
};

export default DropdownButton;
