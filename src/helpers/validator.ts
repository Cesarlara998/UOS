import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export default function Validator(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(500).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(404).json({ error: 'Internal Server Error' });
      }
    }
  };
}