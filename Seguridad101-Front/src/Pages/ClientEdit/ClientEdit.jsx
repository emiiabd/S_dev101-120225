import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, FormClient, NavBar } from "../../Components";
import { useParams } from "react-router-dom";
import { useServices } from "../../Hooks";


const ClientEdit = () => {
  const { clientID, type } = useParams()
  const { payload, isLoadingServices } = useServices(`api/clients/edit/${clientID}`);

  return (
    <div className="min-vh-100">
      <NavBar of={'app'}/>
      <div className="container my-5 g-3">
        <FormClient type={type} clientID={clientID} payload={payload} isLoadingServices={isLoadingServices} />
      </div>
      <Footer />
    </div>
  );
};

export default ClientEdit;
