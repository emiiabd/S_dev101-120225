import ClientsRepository from "../repositories/clients.repositorie.js";
import ParamsRepository from "../repositories/params.repositorie.js";
import PersonRepository from "../repositories/persons.respositorie.js";
import ServicesRepository from "../repositories/services.repositorie.js";
import PARAMS_CODES from "../utils/paramsCodes.util.js";
import { response200, response500 } from "../utils/responses.util.js";
import { updateServiceByIdController } from "./services.controller.js";

const getClientsController = async (req, res) => {
  try {
    const getClients = await ClientsRepository.getClients();
    const persons = await PersonRepository.getPersons();
    const tiposDeConsumidor = await ParamsRepository.getParamsByCode(PARAMS_CODES.PARAMS_TIPO_CONSUMIDOR);
    const tiposDeCuenta = await ParamsRepository.getParamsByCode(PARAMS_CODES.PARAMS_TIPO_CUENTA);
    const tiposDeCliente = await ParamsRepository.getParamsByCode(PARAMS_CODES.PARAMS_TIPO_CLIENTE);
    
    const clients = []
    for(const client of getClients) {
      const person = persons.find(person => Number(person.mt_per_id) === Number(client.mt_cli_per_id));
      
      clients.push({
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
      })
    }

    const response = response200('Clients found', { clients, tiposDeCliente, tiposDeCuenta, tiposDeConsumidor }); 
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response);
  }
}

const getClientByIdController = async (req, res) => {
  try {
    const clientID = req.params.clientID;

    let client = null;
    let person = null;

    if (clientID != 0 ){
      client = await ClientsRepository.getClientById(clientID);
      person = await PersonRepository.getPersonById(client.mt_cli_per_id);
    }
    const tiposDeConsumidor = await ParamsRepository.getParamsByCode(PARAMS_CODES.PARAMS_TIPO_CONSUMIDOR);
    const tiposDeCuenta = await ParamsRepository.getParamsByCode(PARAMS_CODES.PARAMS_TIPO_CUENTA);
    const tiposDeCliente = await ParamsRepository.getParamsByCode(PARAMS_CODES.PARAMS_TIPO_CLIENTE);
    
    const clients = []
    if (clientID != 0){
      clients.push({
        clientID: client.mt_cli_id,
        personID: person.mt_per_id,
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
    }
    

    const response = response200('Clients found', { clients, tiposDeCliente, tiposDeCuenta, tiposDeConsumidor }); 
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response);
  }
}

const updateClientByIdController = async (req, res) => {
  try{
    const data = req.body;
    const { personID, nombre = null, apellido = null, email = null } = req.body;
    const clientID = req.params.clientID || req.body.clientID;
    let response = null;
    if (clientID == 0) {
      const savePerson = await PersonRepository.createPerson({ nombre, apellido, email });
      response = await ClientsRepository.createClient(data, savePerson.id)
    }
    else{
      const savePerson = await PersonRepository.updatePersonById({ nombre, apellido, email, id: personID });
      response = await ClientsRepository.updateClientById(data, clientID);
    }
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response);
  }
}

const deleteClientByIdController = async (req, res) => {
  try{
    const clientID = Number(req.params.clientID) || null;
    const deleteServices = await ServicesRepository.deleteServicesByClientId(clientID);
    const response = await ClientsRepository.deleteClientById(clientID);
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response);
  }
}

const getProductsByClientIdController = async (req, res) => {
  try {
    const clientID = req.params.clientID || null;
    const client = await ClientsRepository.getClientById(clientID);
    const persona = await PersonRepository.getPersonById(client.mt_cli_per_id);

    let productsResponse = [];

  //  GUARDAR PRODUCTOS
  //await ClientsRepository.updateClientProductsById({JSON: JSON.stringify(dataSchema)}, clientID);

  if(client.mt_cli_productosInstalados) {
      productsResponse = JSON.parse(client.mt_cli_productosInstalados);
    }
    
    const response = response200('Products found', { 
      products: productsResponse, 
      client: { 
        nombre: `${persona.mt_per_nombre} ${persona.mt_per_apellido}`,
        direccion: `${client.mt_cli_direccion}, ${client.mt_cli_localidad}, ${client.mt_cli_provincia}`,
        telefono: client.mt_cli_telefono,
        telefono2: client.mt_cli_telefono2,
        clientID,
        cambioBateria: client.mt_cli_cambioBateria ? client.mt_cli_cambioBateria.toISOString().split('T')[0] : null,
        alertaBateria: client.mt_cli_alertaBateria === 1 ? true : false,
      }
    });
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const updateProductByClientIdController = async (req, res) => {
  try {
    const clientID = req.params.clientID || null;
    const data = req.body;
    const resp = await ClientsRepository.updateClientProductsById({JSON: JSON.stringify(data)}, clientID);  

    const response = response200('Products updated', { detail: data, resp });
    return res.status(200).json(response);
  } 
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

export { 
  getClientsController,
  getClientByIdController,
  updateClientByIdController,
  deleteClientByIdController,
  getProductsByClientIdController,
  updateProductByClientIdController
}