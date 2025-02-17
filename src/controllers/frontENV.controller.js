import { response200, response500 } from "../utils/responses.util.js"

const getGoogleMapsFrontApiKey = async (req, res) => {
  try {
    const G_MAPS_API_KEY = process.env.G_MAPS_FRONT_KEY

    const response = response200('OK', { api_key: G_MAPS_API_KEY })
    return res.status(200).json(response)
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message })
    return res.status(500).json(response)
  }
}

const getReCaptchaFrontApiKey = async (req, res) => {
  try {
    const G_CAPTCHA_API_KEY = process.env.G_CAPTCHA_FRONT_KEY

    const response = response200('OK', { api_key: G_CAPTCHA_API_KEY })
    return res.status(200).json(response)
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message })
    return res.status(500).json(response)
  }
}

export { getGoogleMapsFrontApiKey, getReCaptchaFrontApiKey }