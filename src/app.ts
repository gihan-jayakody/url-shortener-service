import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import compressFilter from './utils/compressFilter.util';
import config from './config/config';
import routes from './routes';
import bodyParser from 'body-parser';

const app: Express = express();

// app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [config.cors_origin], //can use multiple origins later
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(helmet());

app.use(compression({ filter: compressFilter }));

app.use(routes);

app.get('/', (_req: Request, res: Response) => {
  res.send('--- WELCOME TO URL SHORTNER SERVICE ---');
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ message: 'success' }).status(200);
});

// Last middleware
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(400).send('An error occurred');
});

export default app;
