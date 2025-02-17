import UserRepository from "../repositories/user.repositorie.js";
import { response200, response400, response403, response500 } from "../utils/responses.util.js";
import { sendEmail } from "../utils/mail.util.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import PersonRepository from "../repositories/persons.respositorie.js";
import e from "cors";

const loginController = async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.getUserByUser(username);

    if (!username || !password) {
      const response = response400('AUTH ERROR', {detail: 'Missing email or password'});
      return res.status(400).json(response);
    }

    if (!user) {
      const response = response400('AUTH ERROR', {detail: 'User not found'});
      return res.status(400).json(response);
    }

    const isPasswordValid = await bcrypt.compare(password, user.mt_usr_password);

    if (!isPasswordValid) {
      const response = response400('AUTH ERROR', {detail: 'Invalid password'});
      return res.status(400).json(response);
    }

    const role = user.mt_usr_rol == 1 ? 'admin' : 'user';
    const token = jwt.sign({ 
      username: user.mt_usr_username, 
      id: user.mt_usr_id, 
      role,
      refId: user.mt_usr_per_id
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const response = response200('User logged', {
      detail: 'User logged-in',
      token,
      user: {
        username: user.mt_usr_username, 
        id: user.mt_usr_id, 
        role,
        refId: user.mt_usr_per_id,
      }
    });

    return res.status(200).json(response);
  }
  catch (error) {
    const response = response400('AUTH ERROR', 
      {
      detail: error.detail || error.message,
    });
    return res.status(400).json(response);
  }
};

const registerController = async(req, res) => {
  try {
    const { nombre, apellido, email, username, password } = req.body;

    const HashedPwd = await bcrypt.hash(password, 10);

    const existUser = await UserRepository.getUserByUser(username);

    if (existUser) throw {detail: 'User already exist'}

    const user = await UserRepository.createUser({nombre, apellido, email, username, HashedPwd});

    if (!user) throw {detail: 'User not created'};

    if (email){
      await sendEmail({
        from: "emi@s101.com.ar",
        to: email,
        subject: 'Email de verificacion de cuenta - NO RESPONDER',
        html: `
        <h1>Se ha creado tu cuenta </h1>
        <p>Seguridad 101</p>
        `
      })
    }

    const response = response200('User created', {detail: 'User created'});
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response400('INTERNAL SERVER ERROR', 
      {
      detail: error.detail || error.message,
      error
    });
    return res.status(400).json(response);
  }
};

const getPersonByIdController = async (req, res) => {
  try {
    const { personID } = req.params;
    console.log(personID)
    const personResponse = await PersonRepository.getPersonById(personID);

    if (!personResponse) throw {detail: 'Person not found'};
    const person = {
      name: personResponse.mt_per_nombre,
      lastName: personResponse.mt_per_apellido
    }
    const response = response200('Person found', person);
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response400('INTERNAL SERVER ERROR', {detail: error.detail});
    return res.status(400).json(response);
  }
};

const verifyTokenController = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token + ' ' + process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) throw {detail: 'Invalid token'};

    const response = response200('Token valid', {detail: 'Token valid'});
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response403('INTERNAL SERVER ERROR', { detail: 'invalid token' });
    return res.status(403).json(response)
  }
};

export { loginController, registerController, getPersonByIdController, verifyTokenController }