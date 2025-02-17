import { useEffect, useState } from "react"
import { orderWithDate } from "../Helpers/ordersArray"
import { GET } from "../fetching/http.fetching"

const  useClient = (ENDPOINT) => {
  const [payload, setPayload] = useState([])
  const [isLoadingServices, setIsLoadingServices] = useState(true)
  
  const getServicesByClientId = async () => {
    const response = await GET(ENDPOINT)
    const service = await response.payload.services
  
    orderWithDate(service)
    setPayload({services: service, client: response.payload.client})
    setIsLoadingServices(false);
  }

  useEffect(() => {
    getServicesByClientId();
  }, [])

  //Se retorna un objeto
  return {
    payload,
    isLoadingServices, 
  }
}

export default useClient
