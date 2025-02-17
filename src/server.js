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
//Body Parser
app.use(express.json({ extended: false, limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb' }));

//Como hostear react directo desde express? Asi --> 
//Primero le decimos a express que use todos los archivos del build de react asi:
app.use(express.static(__dirname + "/Seguridad101-Front/build"));
//Luego le decimos a express que sirva todo eso desde el home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/Seguridad101-Front/build", "index.html"))
});

app.use(cors());
app.use(express.json({limit: '15mb'}));
app.use(verifyApiKeyMiddleware)



app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/status', statusRouter);
app.use('/api/frontENV', frontENVrouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
