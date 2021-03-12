import { string, object } from 'yup';

import type { ObjectSchema } from 'yup';
import type { ObjectShape } from 'yup/lib/object';

const validate = async (
  url: string,
  shortCode: string
): Promise<boolean | void> => {
  const schema: ObjectSchema<ObjectShape> = object().shape({
    url: string().url().min(11).max(2000).trim().required(),
    shortCode: string().max(2000).trim(),
  });

  return schema
    .isValid({
      url,
      shortCode,
    })
    .then(valid => valid)
    .catch(error => {
      console.log(error.name, error.errors);
    });
};

export default validate;
