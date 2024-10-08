import express from 'express';
import cookieParser from 'cookie-parser';
import contactRouter from './routers/contacts.js';
//import authRoutes from './routers/auth.js';
import { env } from './utils/env.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(cookieParser());
  app.use(contactRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  //app.use(authRoutes);

  app.use(errorHandler);

  app.use('*', notFoundHandler); //notFoundHandler

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
