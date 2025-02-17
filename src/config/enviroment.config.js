import dotenv from 'dotenv'

dotenv.config()

const ENVIROMENT = {
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ReCAPTCHA_KEY: process.env.CAPTCHA_SECRET_KEY,
  ReCAPTCHA_URL: process.env.CAPTCHA_URL,
  GMAIL_USER: process.env.GMAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  API_KEY_INTERN: process.env.API_KEY_INTERN,
  G_MAPS_FRONT_KEY: process.env.GOOGLE_MAPS_FRONT_KEY,
  G_CAPTCHA_FRONT_KEY: process.env.GOOGLE_CAPTCHA_FRONT_KEY,
  MYSQL: {
    USERNAME: process.env.MYSQL_USERNAME, // LOCAL -> 'root'
    HOST: process.env.MYSQL_HOST, // LOCAL -> localhost
    PASSWORD: process.env.MYSQL_PASSWORD, // LOCAL -> nada por que no hay
    DATABASE: process.env.MYSQL_DATABASE, // LOCAL -> nombre base de datos
  }
}

export default ENVIROMENT