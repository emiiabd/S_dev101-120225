import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, NavBar, TableProductsClients } from "../../Components";
import { useServices } from "../../Hooks";
import { useNavigate, useParams } from "react-router-dom";
import { POST } from "../../fetching/http.fetching";


const ProductsClients = () => {

  const { clientID } = useParams();
  const ENDPOINT_PENDING = `api/clients/products/${clientID}`;
  const { payload, isLoadingServices } = useServices(ENDPOINT_PENDING);
  
  console.log(payload)
  return (
    <div className="min-vh-100">
      <NavBar of={'app'}/>
      <div className="container my-5 g-3">
        <TableProductsClients 
          data={Array.isArray(payload.products) ? payload.products : [payload.products]} 
          client={payload.client} 
          isLoading={isLoadingServices}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsClients;
