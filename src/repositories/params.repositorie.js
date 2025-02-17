import DB_POOL from "../DB/config.js";

const PARAMS_CODE = {
  PARAMS_TIPO_CUENTA : "TIPO_CUENTA",
  PARAMS_TIPO_CONSUMIDOR : "TIPO_CONSUMIDOR",
  PARAMS_TIPO_SERVICIO : "TIPO_SERVICIO",
  PARAMS_TIPO_PAGO : "TIPO_PAGO",
  PARAMS_TIPO_CLIENTE : "TIPO_CLIENTE",
}

class ParamsRepository {

  static async getParams() {
    try {
      const query = `SELECT * FROM tt_parametros`
      const [rows, col] = await DB_POOL.execute(query);
      return rows.length > 0 ? rows : null
    }
    catch (error) {
      throw (error)
    }
  }

  static async getParamsByCode(code) {
    try {

      const query = `SELECT * FROM tt_parametros WHERE tt_param_codigo = ?`
      const [rows, col] = await DB_POOL.execute(query, [code.toUpperCase()]);
      return rows.length > 0 ? rows : null
    }
    catch (error) {
      throw (error)
    }
  }

  static async getParamsById(id) {
    try {
      if(isNaN(id) || id == '' ) id = 1
      const query = `SELECT * FROM tt_parametros WHERE tt_param_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id]);
      return rows.length > 0 ? rows[0] : null
    }
    catch (error) {
      
      throw (error)
    }
  }

  static async updateParamsById(id, name) {
    try {
      const query = `UPDATE tt_parametros SET tt_param_nombre = ? WHERE tt_param_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [name.toUpperCase(), id]);
      return rows
    }
    catch (error) {
      throw (error)
    }
  }

  static async deleteParamsById(id) {
    try {
      const query = `DELETE FROM tt_parametros WHERE tt_param_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id]);
      return rows
    }
    catch (error) {
      throw (error)
    }
  }
}


export default ParamsRepository