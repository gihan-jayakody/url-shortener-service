import { Router } from 'express';
import {
  createShortenerUrl,
  retrieveUrlDetails,
  redirectToOriginalUrl,
  getAllShortenedUrlRecords,
} from '../controllers/shortener.controller';
import validateRoute from '../middleware/validate';
import {
  UrlCreateSchema,
  UrlRetrieveSchema,
} from '../utils/validationSchema.util';

const urlRouter = Router();

urlRouter.post('/create', validateRoute(UrlCreateSchema), createShortenerUrl);

urlRouter.get(
  '/retrieve',
  validateRoute(UrlRetrieveSchema),
  retrieveUrlDetails
);

urlRouter.get('/redirect', redirectToOriginalUrl);

urlRouter.get('/urls', getAllShortenedUrlRecords);

export default urlRouter;
