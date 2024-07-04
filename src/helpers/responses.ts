import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Response {
            success: (data: any, message?: string) => void;
        }
    }
}

interface ErrorWithStatus extends Error {
  status?: number;
}
const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data: any, message: string = 'Request was successful') => {
    res.status(200).json({
      status: 'success',
      message,
      data,
    });
  };

  next();
};

const errorHandler = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Para loguear el error en la consola, puedes personalizar esto según sea necesario

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    status: 'error',
    message
  });
};

export {responseFormatter, errorHandler};