import * as Yup from 'yup';

const createSchemaValidation = (channelName, t) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required'))
      .notOneOf(channelName, t('errors.unique')),
  });

  return schema;
};

export default createSchemaValidation;
