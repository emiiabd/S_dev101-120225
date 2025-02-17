import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, FormServices, NavBar } from "../../Components";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useServices } from "../../Hooks";
import { POST, PUT } from "../../fetching/http.fetching";


const ServicesEdit = () => {
  const { serviceID, type } = useParams()
  const { payload, isLoadingServices } = useServices(`api/services/edit/${serviceID}/${type}`);
  const { getForm } = useForm(['username', 'password']);
  const navigate = useNavigate();

  const formInputs = {
    cliente: '',
    direccion: '',
    tipo: '',
    fecha: '',
    precio: '',
    pagadoPorCliente: '',
    tecnico :'',
    estado: '',
    formaPago: '',
    observaciones: '',
    estadoPago: false,
    comunicacionTelefonica: false,
    alertaBateria: false,
    cambioBateria: '',
    clientID: '',
  };

  const [formData, setFormData] = useState({
    formInputs,
    tiposDePago: [],
    tiposDeServicio: [],
  });

  const handleOnSubmit = async (e) =>{
    try{
      e.preventDefault();
      console.log(formData.formInputs)
      if(serviceID == 0){
        await POST(`api/services/new/${serviceID}`, formData.formInputs);
      }
      else{
        await POST(`api/services/edit/${serviceID}`, formData.formInputs);
      }
      navigate(-1);
    }
    catch(error){
      console.log(error)
    }
  }

  const handleOnDelete = async (e) =>{
    try{
      e.preventDefault();
      await PUT(`api/services/edit/${serviceID}`);
      navigate(-1);
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div className="min-vh-100">
      <NavBar of={'app'} />
      <div className="container my-5 g-3">
        <FormServices 
          type={serviceID == '0' ? 'new' : type} 
          serviceID={serviceID == '0' ? type : serviceID} 
          payload={payload} 
          isLoadingServices={isLoadingServices}
          formData={formData}
          setFormData={setFormData}
          formInputs={formInputs}
          handleOnSubmit={handleOnSubmit}
          handleOnDelete={handleOnDelete}
          />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesEdit;
