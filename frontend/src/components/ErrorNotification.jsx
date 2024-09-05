import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectIsSuccess, selectError } from '../store/slice/appSlice';
import handleError from '../utils/handleError';

const ErrorNotification = () => {
  const isSuccess = useSelector(selectIsSuccess);
  const errorStatus = useSelector(selectError);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isSuccess && errorStatus) {
      const errorMessage = handleError(errorStatus, t);
      toast.error(errorMessage);
    }
  }, [errorStatus, isSuccess, t]);

  return null;
};

export default ErrorNotification;
