import transporter from "../config/transporter.config.js"

const sendEmail = async (options) =>{
  try{
    const response = await transporter.sendMail(options)
  return
  }
  catch(err){
    console.error('Error al enviar mail: ', err)
    throw err
  }
}

export {
  sendEmail
}
