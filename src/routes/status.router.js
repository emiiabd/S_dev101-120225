import express from 'express';

const statusRouter = express.Router();

statusRouter.get('/', (req, res) => res.send('OK'));

export default statusRouter;