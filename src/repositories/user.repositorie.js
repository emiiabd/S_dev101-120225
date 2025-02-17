import DB_POOL from "../DB/config.js";
import { PersonsBuilder } from "../utils/builders/db.builder.js";
import PersonRepository from "./persons.respositorie.js";

class UserRepository {
  static async getUserByUser(username) {
    try{
      
      const query = `SELECT * FROM mt_usuarios WHERE mt_usr_username = ?`
      const [rows, col] = await DB_POOL.execute(query, [username]);
      const finish = await DB_POOL.end()
      console.log(finish)
      return rows.length > 0 ? rows[0] : null
    }
    catch(error){
      throw(error)
    }
  }

  static async getUserById(id) {
    try{
      
      const query = `SELECT * FROM mt_usuarios WHERE mt_usr_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id]);
      DB_POOL.end()
      return rows.length > 0 ? rows[0] : null
    }
    catch(error){
      throw(error)
    }
  }

  static async createUser(userData) {
    const { nombre, apellido, email, username, HashedPwd } = userData
    try {
      const personObj = new PersonsBuilder()
      .setName(nombre)
      .setSurname(apellido)
      .setEmail(email)
      .build()
      
      const person = await PersonRepository.createPerson(personObj);
      const query = `INSERT INTO mt_usuarios (mt_usr_per_id, mt_usr_username, mt_usr_password, mt_usr_rol) VALUES ( ?, ?, ?, 1)`
      const [rows, col] = await DB_POOL.execute(query, 
      [
        person.id,
        username,
        HashedPwd
      ]);
    return rows
    } catch (error) {
      console.log(error)
      throw(error);
    }
  }

  static async deleteUserById(id) {
    try {
      const query = `DELETE FROM mt_usuarios WHERE mt_usr_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id]);
    return rows
    } catch (error) {
      throw(error);
    }
  }

  static async updateUser(userData) {
    try {
      const { id, username, HashedPwd, rol } = userData
      const query = `UPDATE mt_usuarios SET mt_usr_username = ?, mt_usr_password = ?, mt_usr_rol = ? WHERE mt_usr_id = ?`
      const [rows, col] = await DB_POOL.execute(query, 
      [
        username,
        HashedPwd,
        rol,
        id
      ]);
    return rows
    } catch (error) {
      throw(error);
    }
  }
}

export default UserRepository