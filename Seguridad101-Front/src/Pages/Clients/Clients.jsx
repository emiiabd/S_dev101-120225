import React, { } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar, TableComponent, TableComponentLinks } from "../../Components";
import { useSearch, useServices } from "../../Hooks";
import { useParams } from "react-router-dom";


const Clients = () => {
  const ENDPOINT_PENDING = 'api/clients';
  const { payload, isLoadingServices } = useServices(ENDPOINT_PENDING);

  const { search, searcher, result } = useSearch(payload.clients, 'clients');

  return (
    <div className="min-vh-100">
      <NavBar of={'app'}/>
      <div className="container my-5 g-3">
        <TableComponentLinks of={'clients'}/>
        <TableComponent of={'clients'} data={result} search={search} searcher={searcher} isLoading={isLoadingServices} />
      </div>
      <Footer />
    </div>
  );
};

export default Clients;