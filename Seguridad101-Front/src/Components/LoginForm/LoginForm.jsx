import React from "react";
import "./LoginForm.css";
import { FORM_SCHEMA } from "../../Data/data";
import { useGlobalContext } from "../../Context/GlobalContext";
import { Alert } from "react-bootstrap";
import useForm from "../../Hooks/useForm";

const LoginForm = ({ title, spanTitle, handleLoginSubmit}) => {


  const { errorsValues } = useGlobalContext();

  const { getForm } = useForm(['username', 'password']);

  const loginSchema = getForm();

  
  const renderForm = [];
  for(const prop in loginSchema){
    renderForm.push(
      <div className="form-floating mb-3" key={prop}>
        <input
          type={FORM_SCHEMA[prop].type}
          name={prop}
          id={FORM_SCHEMA[prop].id}
          placeholder={FORM_SCHEMA[prop].labelText}
          className={FORM_SCHEMA[prop].className}
          required
        />
        <label htmlFor={FORM_SCHEMA[prop].id}>{FORM_SCHEMA[prop].labelText}</label>
      </div>
    );
  };


  return (
    <>
    <form action="" className="container mx-5 form loginForm text-center" onSubmit={(e) => handleLoginSubmit(e)}>
      <div className="pb-4">
        {
          title &&<h3>{title}</h3>
        }
      </div>
      {renderForm}
      <button type="submit" className="btn btnSubmit w-50 btn-primary mb-3">
        Iniciar Sesion
      </button>
      {
        errorsValues.map((i, index) => {
          if(i){
            return <Alert key={index} variant='danger' className="text-center mb-3 p-1 form-floating">{i}</Alert>
          }
        })
      }
    </form>
    </>
  );
};

export default LoginForm;
