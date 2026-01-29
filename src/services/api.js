import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    let auth = null;

    try {
      const authLocal = localStorage.getItem("auth");
      const authSession = sessionStorage.getItem("auth");

      if (authLocal) {
        auth = JSON.parse(authLocal);
      } else if (authSession) {
        auth = JSON.parse(authSession);
      }
    } catch (error) {
      console.error("Erro ao recuperar auth do storage:", error);
    }

    if (auth?.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;