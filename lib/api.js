import axios from 'axios'; 

 

const api = axios.create({ 

  baseURL: 'https://api-contatos-auth-04-09-25.onrender.com/', // AJUSTE AQUI 

}); 

 

export const setAuthToken = (token) => { 

  if (token) { 

    api.defaults.headers.common.Authorization = `Bearer ${token}`; 

  } else { 

    delete api.defaults.headers.common.Authorization; 

  } 

}; 

 

export default api; 