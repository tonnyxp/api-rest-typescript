import { Response } from 'express';

const handleHttpError = (res: Response, error: string) => {
  console.log('Error', error);
  res.status(500).send(error);
};

/**
 * Handle error specific
 * @param res
 * @param message
 * @param code
 */
const handleErrorResponse = (res: Response, message: string, code = 401) => {
  // console.log("Error", message);
  res.status(code).send({ message });
};

export { handleHttpError, handleErrorResponse };
