import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

/**
 * This function will provide middleware validation function
 * Use joi library to perform teh validations
 * @param schema
 * @returns function
 */
const validateRoute =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.object(schema).validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false, stripUnknown: true }
    );
    if (!error) {
      next();
    } else {
      const errors = error?.details.map((err) => ({
        field: err.path.join(', '),
        message: err.message,
      }));

      res.status(400).json({ errors });
    }
  };

export default validateRoute;
