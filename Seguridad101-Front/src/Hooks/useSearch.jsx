import React, { useState } from "react";

const useSearch = (arrElemnts, of) => {
  const [search, setSearch] = useState('');

  const searcher = (e) => {
    setSearch(e.target.value);
  }

  let result = [];
  
  if (of === 'users' ) result = !search ? arrElemnts : arrElemnts.filter(user => user.user.toLowerCase().includes(search.toLowerCase()))
  if (of === 'clients' ) result = !search ? arrElemnts : arrElemnts.filter(clients => clients.nombre.toLowerCase().includes(search.toLowerCase()) || clients.apellido.toLowerCase().includes(search.toLowerCase()))
  if (of === 'services') result = !search ? arrElemnts : arrElemnts.filter(service => service.client.toLowerCase().includes(search.toLowerCase()))

  return {
    search,
    searcher,
    result
  }
}

export default useSearch