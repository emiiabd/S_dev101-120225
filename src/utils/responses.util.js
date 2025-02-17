import { ResponseBuilder } from "./builders/responseBuilder.js"

// 200 ok
const response200 = (message, payload) => new ResponseBuilder().setOK(true).setStatus(200).setMessage(message).setPayload(payload).build()
// 201 creado
const response201 = (message, payload) => new ResponseBuilder().setOK(true).setStatus(201).setMessage(message).setPayload(payload).build()
// 400 bad request
const response400 = (message, payload) => new ResponseBuilder().setOK(false).setStatus(400).setMessage(message).setPayload(payload).build()
// 401 no autorizado
const response401 = (message, payload) => new ResponseBuilder().setOK(false).setStatus(401).setMessage(message).setPayload(payload).build()
// 403 no autorizado para usuarios que no esten autorizados
const response403 = (message, payload) => new ResponseBuilder().setOK(false).setStatus(403).setMessage(message).setPayload(payload).build()
// 404 no encontrado
const response404 = (message, payload) => new ResponseBuilder().setOK(false).setStatus(404).setMessage(message).setPayload(payload).build()
// 500 error en el servidor
const response500 = (message, payload) => new ResponseBuilder().setOK(false).setStatus(500).setMessage(message).setPayload(payload).build()

export {
  response200,
  response201,
  response400,
  response401,
  response403,
  response404,
  response500
}