const express = require('express');
import routes from '../routes/index';
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
const app = express();

// parse body params and attache them to req.body
app.use(json({limit: '500mb'}));
app.use(urlencoded({ extended: true, limit: '500mb' }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', routes);

export default app;
