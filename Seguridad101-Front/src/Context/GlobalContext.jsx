import React, { createContext, useContext, useEffect, useState } from 'react'
import { GET } from '../fetching/http.fetching';

const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {

  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({})

  const getter = async () => {
    try{
      const response = await GET('api/services/pending')
      const response2 = await GET('api/services/Battery')
      const response3 = await GET('api/services/paymentPending')
      sessionStorage.setItem('Pendings', JSON.stringify({services: await response.payload.services.length, battery: await response2.payload.services.length, payPending: await response3.payload.services.length}) );
      return {services: await response.payload.services.length, battery: await response2.payload.services.length, payPending: await response3.payload.services.length}
    }catch(error){
      return error
    }
  }

  useEffect(() => {

    getter()
    if(sessionStorage.getItem('username')) setUser(JSON.parse(sessionStorage.getItem('username')))

  }, []);

  const addError = (error, origen) =>{
    setErrors((prevState) => ({...prevState, [origen]: error}));
  };

  const deleteError = (origen) => {
    if(origen == 'all') return setErrors({});
    setErrors((prevState) => ({...prevState, [origen]: ''}));
  };
  
  const errorsValues = Object.values({...errors});
  return (
    <GlobalContext.Provider value={
      {
        addError,
        deleteError,
        errorsValues,
        user,
        setUser,
        getter
      }}>
    {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);