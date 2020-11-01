import { string, object } from 'yup';

const validate = (url, shortCode) => {
  const schema = object().shape({
    url: string().url().min(11).max(2000).trim().required(),
    shortCode: string().max(2000).trim(),
  });

  return schema
    .isValid({
      url,
      shortCode,
    })
    .then((valid) => valid)
    .catch((error) => {
      console.log(error.name, error.errors);
    });
};

export default validate;
