import React from 'react'
import { useSearch, useServices } from '../../Hooks';
import { Footer, NavBar, TableComponent, TableComponentLinks } from '../../Components';


const PaymentPending = () => {

  const ENDPOINT_PAYMENT = 'api/services/paymentPending';
  const { payload, isLoadingServices } = useServices(ENDPOINT_PAYMENT);

  const services = payload.services

  const { search, searcher, result } = useSearch(services, 'services');
  return (
    <div className="min-vh-100">
      <NavBar of={'app'}/>
      <div className="container my-5 g-3">
        <TableComponentLinks of={'paymentPending'}/>
        <TableComponent data={result} search={search} searcher={searcher} isLoading={isLoadingServices} />
      </div>
      <Footer />
    </div>
  )
}

export default PaymentPending