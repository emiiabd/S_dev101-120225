class ResponseBuilder {
  
  constructor(){
    this.response = {
      ok: false,
      status: 500,
      message: 'GET_INFO_ERROR',
      payload : {},
    }
  }

  setOK(bool){
    this.response.ok = bool
    return this
  }
  
  setStatus(status){
    this.response.status = status
    return this
  }
  
  setMessage(message){  
    this.response.message = message
    return this
  }

  setPayload(payload){
    this.response.payload = payload
    return this
  }

  build(){
    return this.response
  }

}

export {
  ResponseBuilder
}