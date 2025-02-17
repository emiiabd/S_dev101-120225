import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar, TableComponentServices } from "../../Components";
import { useClient, useSearch, useServices } from "../../Hooks";
import { useParams } from "react-router-dom";


const Services = () => {

  const { clientID } = useParams();

  const ENDPOINT_SERVICES_CLIENTS = `api/services/${clientID}`;
  const { payload, isLoadingServices } = useClient(ENDPOINT_SERVICES_CLIENTS);

  const { search, searcher, result } = useSearch(payload.services, 'services');

  return (
    <div className="min-vh-100">
      <NavBar of={'app'}/>
      <div className="container my-5 g-3">
        <TableComponentServices data={result} client={payload.client} search={search} searcher={searcher} isLoading={isLoadingServices} />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
