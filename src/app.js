import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
const cors = require('cors');

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const app = Express();

app.use(cors());

// app.set('trust proxy', true);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    proxy: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use((_req, res, next) => {
  res.header({
    Connection: 'close',
    'Cache-Control': 'public, max-age=31536000, no-cache',
  });
  return next();
});

app.get('/aaa', (req, res) => {
  console.log('LLLLLLLLLLL');
  const path = `/api/blogs`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
