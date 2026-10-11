import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// Interceptor de Requisição (Request)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@gerenciador-tarefas:token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de Resposta (Response)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de falhas de rede
    if (!error.response) {
      alert("Erro de rede: Verifique a sua ligação à internet.");
    } else {
      console.error(
        `Erro da API (${error.response.status}):`,
        error.response.data.message,
      );
      alert(
        error.response.data.message ||
          "Ocorreu um erro ao comunicar com o servidor.",
      );
    }
    return Promise.reject(error);
  },
);
