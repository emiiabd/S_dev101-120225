import express from 'express';
import { getGoogleMapsFrontApiKey, getReCaptchaFrontApiKey } from '../controllers/frontENV.controller.js';

const frontENVrouter = express.Router();

frontENVrouter.get('/GM-ak', getGoogleMapsFrontApiKey);
frontENVrouter.get('/GC-ak', getReCaptchaFrontApiKey);

export default frontENVrouter;