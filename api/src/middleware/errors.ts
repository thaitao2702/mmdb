import { ErrorRequestHandler } from 'express';
import { pick } from 'lodash';

import { CustomError} from 'errors/customErrors'

export const handleErrors : ErrorRequestHandler = (err, req, res, next) => {
    console.log('error: ', err);
    const isCustomErr = err instanceof CustomError;
    
    const clientError = isCustomErr
    ? pick(err, ['message', 'code', 'status', 'data'])
    : {
        message: 'Something went wrong, please contact our support.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
        };

    res.status(clientError.status).send({ error: clientError });

}