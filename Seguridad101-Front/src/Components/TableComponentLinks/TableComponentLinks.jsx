import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../Context/GlobalContext';

const TableComponentLinks = ({ of }) => {
  
  const { getter }= useGlobalContext()
  const [pendingsList, setPendingsList] = useState(
    {
    services: 0,
    battery: 0,
    payPending: 0
    }
  )
  
  useEffect(() => {
    const getGetter = async() => {
      const response = await getter()
      if (response.services) setPendingsList(response) 
    }

    getGetter()
  }, [])
  
  //console.log(pendingsList)
  return (
    <>
    {
      of === 'clients' 
      ?
      <div className="colunm">
        <div className="col">
          <h2 className='pb-4 my-3 border-bottom'>{of === 'clients' ? 'Clientes' : 'Usuarios'}</h2>
        </div>
      </div>
      :
      <ul className="list-group list-group-horizontal container-md flex-md-row d-flex flex-column ">
      <li className={`list-group-item ` + (of === 'pending' ? 'active' : '')}>
          <a href="/log/s101/pending" className="btn ">
            Trabajos Pendientes ( {pendingsList.services} )
          </a>
        </li>
        <li className={`list-group-item ` + (of === 'battery' ? 'active' : '')}>
          <a href="/log/s101/battery" className="btn">Alertas de Batería ({pendingsList.battery})</a>
        </li>
        <li className={`list-group-item ` + (of === 'paymentPending' ? 'active' : '')}>
          <a href="/log/s101/paymentPending" className="btn ">Pendientes de Pago ({pendingsList.payPending})</a>
        </li>
    </ul>}
    </>
  )
}

export default TableComponentLinks