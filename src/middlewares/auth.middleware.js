import ENVIROMENT from "../config/enviroment.config.js"
import { response401, response403, response500 } from "../utils/responses.util.js"
import jwt from 'jsonwebtoken'

const verifyTokenMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      if (!token) throw {
        ok: false,
        response: response401('AUTH ERROR', { detail: 'Token not found' })
      }

      req.user = jwt.verify(token, ENVIROMENT.JWT_SECRET);

      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) throw {
        ok: false,
        response: response403('AUTH ERROR', { detail: 'User not authorized' })
      }

      
      return next();
    }
    catch (error) {
        console.log()
        const response = response403('INTERNAL SERVER ERROR', { detail: 'token not found' });
        if(error.name === 'JsonWebTokenError') return res.status(401).json(response)
        return res.status(403).json(response403('INTERNAL SERVER ERROR', { 
          detail: 'invalid token' ,
          error
        }))
    }
  }
}

const verifyApiKeyMiddleware = (req, res, next) => {
  try{
    
    const apikey_header = req.headers['x-api-key']
    if(!apikey_header){
      const response = response401 ('Unauthorized', { detail: 'Falta el api-key de autorizacion' })
      return res.status(401).json(response)
    }
    
    if(apikey_header != ENVIROMENT.API_KEY_INTERN){
      const response = response401 ('Unauthorized', { detail: 'Api-key es invalida' })
      return res.status(401).json(response)
    }
    
    
    return next()
  }
  catch(err){
    const response = response500('INTERNAL SERVER ERROR', err);
    return res.status(500).json(response)
  }
}

export { verifyTokenMiddleware, verifyApiKeyMiddleware }