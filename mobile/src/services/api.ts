import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.177:19000",
});

export default api;
