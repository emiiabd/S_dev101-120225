import express from 'express';
import cors from 'cors';
import statusRouter from './routes/status.router.js';
import authRouter from './routes/auth.router.js';
import servicesRouter from './routes/services.router.js';
import clientsRouter from './routes/clients.router.js';
import { verifyApiKeyMiddleware } from './middlewares/auth.middleware.js';
import frontENVrouter from './routes/frontENV.router.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({limit: '15mb'}));
app.use(verifyApiKeyMiddleware)

app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/status', statusRouter);
app.use('/api/frontENV', frontENVrouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
