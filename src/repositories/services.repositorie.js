import DB_POOL from "../DB/config.js";
/* 
ESTADO_PENDIENTE = 1;
ESTADO_FINALIZADO = 2;
ESTADO_REPROGRAMADO = 3;
*/
class ServicesRepository {

  static async getServicesByState (state) {
    const query = `SELECT * FROM tt_servicios WHERE tt_srvc_estado = ? `;
    const [rows, col] = await DB_POOL.execute(query, [state]);
    return rows.length > 0 ? rows : null;
  }
  
  static async getServicesPaymentPending () {
    const query = `SELECT * FROM tt_servicios WHERE tt_srvc_estadoPago = ? `;
    const [rows, col] = await DB_POOL.execute(query, [0]);
    return rows.length > 0 ? rows : null;
  }

  static async getServicesByClientId (id) {
    const query = `SELECT * FROM tt_servicios WHERE tt_srvc_cli_id = ? `;
    const [rows, col] = await DB_POOL.execute(query, [id]);
    return rows.length > 0 ? rows : null;
  }

  static async getServiceById (id) {
    try {
      const query = `SELECT * FROM tt_servicios WHERE tt_srvc_id = ?`;
      const [rows, col] = await DB_POOL.execute(query, [id]);
      return rows.length > 0 ? rows[0] : null;
    } 
    catch (error) {
      throw (error);
    }
  }

  static async createService (service, clientID) {
    try {
      const { tipo, fecha, precio, pagadoPorCliente, tecnico, estado, formaPago, observaciones, estadoPago, comunicacionTelefonica, cambioBateria, alertaBateria} = service;
      
      const query = `INSERT INTO tt_servicios (
        tt_srvc_cli_id,
        tt_srvc_tipo, 
        tt_srvc_precio, 
        tt_srvc_observaciones,
        tt_srvc_estado,
        tt_srvc_fecha,
        tt_srvc_tecnico,
        tt_srvc_estadoPago,
        tt_srvc_formaPago, 
        tt_srvc_cambioBateria,
        tt_srvc_pagadoPorCliente,
        tt_srvc_comunicacionTelefonica,
        tt_srvc_alertaBateria
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      
      const [rows, col] = await DB_POOL.execute(query, [
        clientID,
        Number(tipo),
        precio,
        observaciones,
        estado,
        fecha ? fecha : new Date(),
        tecnico,
        estadoPago,
        formaPago,
        null,
        pagadoPorCliente,
        comunicacionTelefonica,
        alertaBateria
      ])

      return {
        id: rows.insertId,
        ...service
      }
    }
    catch (error) {
      console.log(error)
      throw (error)
    }
  }

  static async updateService (service, serviceID) {
    try {
      const { tipo, fecha, precio, pagadoPorCliente, tecnico, estado, formaPago, observaciones, estadoPago, comunicacionTelefonica, cambioBateria, alertaBateria} = service;

      const query = `UPDATE tt_servicios SET
        tt_srvc_tipo = ?,
        tt_srvc_fecha = ?,
        tt_srvc_precio = ?,
        tt_srvc_pagadoPorCliente = ?,
        tt_srvc_tecnico = ?,
        tt_srvc_estado = ?,
        tt_srvc_formaPago = ?,
        tt_srvc_observaciones = ?,
        tt_srvc_estadoPago = ?,
        tt_srvc_comunicacionTelefonica = ?,
        tt_srvc_cambioBateria = ?,
        tt_srvc_alertaBateria = ?
        WHERE tt_srvc_id = ?`
      
      const [rows, col] = await DB_POOL.execute(query, [
        tipo,
        fecha ? new Date(fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        precio,
        pagadoPorCliente,
        tecnico,
        estado,
        formaPago,
        observaciones,
        estadoPago,
        comunicacionTelefonica,
        null,
        alertaBateria,
        serviceID
      ])

      return {
        serviceID,
        rows
      }
    }
    catch (error) {
      console.log(error)
      throw (error)
    }
  }

  static async deleteService (id) {
    try {
      const query = `DELETE FROM tt_servicios WHERE tt_srvc_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id]);
      return rows
    }
    catch (error) {
      throw (error)
    }
  }

  static async deleteServicesByClientId (id) {
    try {
      const query = `DELETE FROM tt_servicios WHERE tt_srvc_cli_id = ?`
      const [rows, col] = await DB_POOL.execute(query, [id]);
      return rows
    }
    catch (error) {
      throw (error)
    }
  }
}

export default ServicesRepository