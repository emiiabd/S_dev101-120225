import { useEffect, useState } from "react"
import { GET } from "../fetching/http.fetching.js"

const  useServices = (ENDPOINT) => {
  const [payload, setPayload] = useState([])
  const [isLoadingServices, setIsLoadingServices] = useState(true)

  const getServices = async () => {
    const response = await GET(ENDPOINT)

    if(response.ok) {
      setPayload(response.payload)
      setIsLoadingServices(false)
      return
    }

    return response
  }

  useEffect(() => {
    getServices()
  }, [])

  //Se retorna un objeto
  return {
    payload,
    isLoadingServices, 
  }
}

export default useServices
