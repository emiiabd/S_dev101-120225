import ENVIROMENT from "../config/enviroment.config.js";
import POSTReCaptcha from "../fetching/captcha.fetching.js";
import { response500 } from "../utils/responses.util.js";

const verifyCaptchaMiddleware = () => {
  return async (req, res, next) => {
    try {
      const secret = ENVIROMENT.ReCAPTCHA_KEY;
      const captchaKey = req.params.ReCaptcha;
      
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaKey}`;
      
      const response = await POSTReCaptcha(url);
      
      if (response.success) {
        return next();
      } else if (!response.success) {
        throw {
          ok: false,
          detail: 'Captcha not valid' 
        }
      }

      return console.log(url, response);
      
    } catch (error) {
      const response = response500('CAPTCHA VALIDATON ERROR', { detail: error.detail});
      return res.status(500).json(response);    
    }
}
}

export { verifyCaptchaMiddleware }

