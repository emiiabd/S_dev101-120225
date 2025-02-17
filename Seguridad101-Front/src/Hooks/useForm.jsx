import { useGlobalContext } from "../Context/GlobalContext";
import { FORM_SCHEMA } from "../Data/data";
import { validationSchema } from "../Helpers/validations";

const useForm = (formFields = []) => {
  const { addError, deleteError } = useGlobalContext();

  
  //GETING THE FORM SHADOWS
  const getForm = () => {
    const formSchema = {};
    for(const prop in FORM_SCHEMA){
      if(formFields.includes(prop)){
        formSchema[prop] = FORM_SCHEMA[prop];
      }};
      return formSchema
    }
    
  //VALIDATE SCHEMA
  const getValidateSchema = () => {
    const validateSchema = {};
    for(const prop in validationSchema ){
      if(formFields.includes(prop)){
        validateSchema[prop] = validationSchema[prop]
    }};
    return validateSchema
  }


  //MAKE VALIDATIONS IN ONE VALIDATE SCHEMA
  const validatesFormInputs = (validateSchema, formValues, ReCaptcha = null) => {
    const valuesToValidate = {};
    
    if(!ReCaptcha && ReCaptcha !== null){
      addError('Valida que no eres un robot', 'captcha');
    }else{
      deleteError('captcha');
    }

    for(const prop in validateSchema){
      valuesToValidate[prop] = formValues.get(prop);
      if(!(validateSchema[prop].validate(valuesToValidate[prop]))){
        addError(validateSchema[prop].errorText, prop);
      }else{
        deleteError(prop);
      };
    };

    return
  }

  return {
    getForm,
    getValidateSchema,
    validatesFormInputs,
  }
}

export default useForm