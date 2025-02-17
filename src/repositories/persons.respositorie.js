import DB_POOL from "../DB/config.js";

class PersonRepository {
  static createPerson = async (person) => {
    try{
      const {nombre, apellido, email} = person

      const query = `INSERT INTO mt_personas ( mt_per_nombre, mt_per_apellido, mt_per_email) VALUES (?, ?, ?)`

      const [rows, col] = await DB_POOL.execute(query, [nombre, apellido, email]);
      return {
        id: rows.insertId,
        nombre, apellido, email
      }
    }
    catch(error){
      throw(error)
    }
  }

  static getPersons = async () => {
    try{
      const query = `SELECT * FROM mt_personas`
      const [rows, col] = await DB_POOL.execute(query)
      return rows
    }
    catch(error){
      throw(error)
    }
  }
  static getPersonById = async (id) => {
    try{
      const query = `SELECT * FROM mt_personas WHERE mt_per_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id])
      return rows.length > 0 ? rows[0] : null
    }
    catch(error){
      throw(error)
    }
  }

  static deletePersonById = async (id) => {
    try{
      const query = `DELETE FROM mt_personas WHERE mt_per_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id])
      return rows.affectedRows > 0 ? true : false
    }
    catch(error){
      throw(error)
    }
  }

  static updatePersonById = async (person) => {
    try{
      const {nombre, apellido, email, id} = person
      const query = `UPDATE mt_personas SET mt_per_nombre = ?, mt_per_apellido = ?, mt_per_email = ? WHERE mt_per_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [nombre, apellido, email, id])
      return rows.affectedRows > 0 ? true : false
    }
    catch(error){
      throw(error)
    }
  }
}

export default PersonRepository