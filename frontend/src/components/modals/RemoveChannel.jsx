import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import {
  selectChannelId,
  selectError,
  selectIsSuccses,
} from '../../store/slice/appSlice';
import handleError from '../../utils/handleError';

const RemoveChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();
  const channelId = useSelector(selectChannelId);
  const isSuccses = useSelector(selectIsSuccses);
  const errorStatus = useSelector(selectError);

  const deleteChannel = async (id) => {
    await removeChannel(id).unwrap();
  };

  useEffect(() => {
    if (isSuccses) {
      toast.success(t('toast.channelDeletedSuccessfully'));
      handleClose();
    }

    if (!isSuccses && errorStatus) {
      const errorMessage = handleError(errorStatus, t);
      toast.error(errorMessage);
      handleClose();
    }
  }, [isSuccses, errorStatus, t, handleClose]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modal.text')}
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={handleClose}
          >
            {t('modal.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteChannel(channelId)}
          >
            {t('modal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
