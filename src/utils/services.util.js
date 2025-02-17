import ClientsRepository from "../repositories/clients.repositorie.js";
import ParamsRepository from "../repositories/params.repositorie.js";
import PersonRepository from "../repositories/persons.respositorie.js";
import ServicesRepository from "../repositories/services.repositorie.js";

const responseServicesCreator = async (servicesArr) => {
  const responseServices = [];
  for(const service of servicesArr) {
    const client = await ClientsRepository.getClientById(service.tt_srvc_cli_id);
    const persona = await PersonRepository.getPersonById(client.mt_cli_per_id)
    const type = await ParamsRepository.getParamsById(service.tt_srvc_tipo);

    responseServices.push({
      serviceID: service.tt_srvc_id,
      type: type.tt_param_nombre,
      client: `${persona.mt_per_nombre} ${persona.mt_per_apellido}`,
      clientID: service.tt_srvc_cli_id,
      address: client.mt_cli_direccion,
      technician : service.tt_srvc_tecnico,
      observations: service.tt_srvc_observaciones,
    })
  }

  return responseServices
}

const changeBatteryAlert = async () => {
  const services = await ServicesRepository.getServicesBatteryAlert(1);

  /* for(const service of services) {
    service.tt_srvc_alertaBateria = 0

    const serviceTOrepo = {
      id: service.tt_srvc_id, 
      idCliente: service.tt_srvc_cli_id, 
      idTipo: service.tt_srvc_tipo, 
      precio: service.tt_srvc_precio, 
      observaciones: service.tt_srvc_observaciones, 
      estado: service.tt_srvc_estado, 
      fecha: service.tt_srvc_fecha, 
      tecnico: service.tt_srvc_tecnico, 
      estadoPago: service.tt_srvc_estadoPago, 
      formaPago: service.tt_srvc_formaPago, 
      cambioBateria: service.tt_srvc_cambioBateria, 
      pagadoPorCliente: service.tt_srvc_pagadoPorCliente, 
      comunicacionTelefonica: service.tt_srvc_comunicacionTelefonica, 
      alertaBateria: service.tt_srvc_alertaBateria
    }
    console.log(serviceTOrepo)
    await ServicesRepository.updateService(serviceTOrepo)

  } */

  for(const service of services) {
    const year = service.tt_srvc_fecha.getFullYear()
    
    if(year >= 2021) {
      service.tt_srvc_alertaBateria = 0
      const serviceTOrepo = {
        id: service.tt_srvc_id, 
        idCliente: service.tt_srvc_cli_id, 
        idTipo: service.tt_srvc_tipo, 
        precio: service.tt_srvc_precio, 
        observaciones: service.tt_srvc_observaciones, 
        estado: service.tt_srvc_estado, 
        fecha: service.tt_srvc_fecha, 
        tecnico: service.tt_srvc_tecnico, 
        estadoPago: service.tt_srvc_estadoPago, 
        formaPago: service.tt_srvc_formaPago, 
        cambioBateria: service.tt_srvc_cambioBateria, 
        pagadoPorCliente: service.tt_srvc_pagadoPorCliente, 
        comunicacionTelefonica: service.tt_srvc_comunicacionTelefonica, 
        alertaBateria: service.tt_srvc_alertaBateria
      }
      console.log(serviceTOrepo)
      await ServicesRepository.updateService(serviceTOrepo)
    }
  }
  console.log('Cambios realizados')
}

//changeBatteryAlert()

const changeBatteryDate_srvc_To_cli = async (clientID) => {
  try {
    const services = await ServicesRepository.getServicesByClientId(clientID);
    const datesArray = []    
    for (const service of services) {
      const date = service.tt_srvc_cambioBateria
      if (date) {
        datesArray.push(date)
      }
    }
    orderWithDate(datesArray)
    const lastDate = datesArray[0]
    const saveLastDate = await ClientsRepository.updateClientBatteryById({ cambioBateria: lastDate, alertaBateria: true }, clientID);
    return saveLastDate
  }
  catch (error) {
    //const response = response500('INTERNAL SERVER ERROR', { detail: error });
    return res.status(500).json(response)
  }
}

const getAllClientsAndChangeDates = async () =>{
  try {
    const clients = await ClientsRepository.getClients();

    for (const client of clients) {
      console.log(client.mt_cli_id)
      //await changeBatteryDate_srvc_To_cli(client.mt_cli_id)
    }
    return clients
  } catch (error) {
    return error
  }
}

//getAllClientsAndChangeDates()

export {
  responseServicesCreator
}

/* {
  mt_cli_id: 21,
  mt_cli_per_id: 37,
  mt_cli_direccion: 'HONORIO BARRAQUERO 182- GODOY CRUZ',
  mt_cli_fecha_nacimiento: 2017-04-29T03:00:00.000Z,
  mt_cli_telefono: '4249107',
  mt_cli_tipo_consumidor: 3,
  mt_cli_banco: '',
  mt_cli_tipo_cuenta: null,
  mt_cli_cbu: '',
  mt_cli_provincia: 'MENDOZA',
  mt_cli_localidad: 'GODOY CRUZ',
  mt_cli_cuil: '',
  mt_cli_telefono2: '156537166',
  mt_cli_observaciones: '',
  mt_cli_tipo_cliente: 17
} 
  
{
  mt_per_id: 30,
  mt_per_nombre: 'FABIAN',
  mt_per_apellido: 'ANDREU',
  mt_per_email: ''
}

        clientID: client.mt_cli_id,
        nombre: `${person.mt_per_nombre} `,
        apellido: `${person.mt_per_apellido}`,
        direccion: client.mt_cli_direccion,
        fecha_nacimiento: client.mt_cli_fecha_nacimiento,
        telefono: client.mt_cli_telefono,
        tipo_consumidor: client.mt_cli_tipo_consumidor,
        banco: client.mt_cli_banco,
        tipo_cuenta: client.mt_cli_tipo_cuenta,
        cbu: client.mt_cli_cbu,
        provincia: client.mt_cli_provincia,
        localidad: client.mt_cli_localidad,
        cuil: client.mt_cli_cuil,
        telefono2: client.mt_cli_telefono2,
        observaciones: client.mt_cli_observaciones,
        tipo_cliente: client.mt_cli_tipo_cliente,
        email: person.mt_per_email
      })
         { clients, tiposDeCliente, tiposDeCuenta, tiposDeConsumidor }); 
*/