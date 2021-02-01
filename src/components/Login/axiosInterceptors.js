import axios from "axios";

export const axiosInterceptors = {
  setupInterceptors: () => {
    const token = localStorage.getItem("access-token");

    axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // catches if the session ended!
        if (error.response && error.response.status === 401) {
          // localStorage.clear();
        }
        return Promise.reject(error);
      }
    );
  },
};

export default axiosInterceptors;
