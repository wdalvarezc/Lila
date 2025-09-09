import axios from "axios";

const api = axios.create({
  baseURL: "https://inventariolila.onrender.com/api/",
});


export default api;
