import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar, TableComponent, TableComponentLinks } from "../../Components";
import { useSearch, useServices } from "../../Hooks";
import { useGlobalContext } from "../../Context/GlobalContext";


const Pending = () => {

  const ENDPOINT_PENDING = 'api/services/pending';
  const { payload, isLoadingServices } = useServices(ENDPOINT_PENDING);
  const services = payload.services
  const { search, searcher, result } = useSearch(services, 'services');

  return (
    <div className="min-vh-100">
      <NavBar of={'app'}/>
      <div className="container my-5 g-3">
        <TableComponentLinks of={'pending'}/>
        <TableComponent data={result} search={search} searcher={searcher} isLoading={isLoadingServices} of={'pending'} />
      </div>
      <Footer />
    </div>
  );
};

export default Pending;
