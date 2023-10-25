import axios from "axios";

export const axiosBaseURL = axios.create({
  baseURL: "https://voyance.azurewebsites.net/",
});

axiosBaseURL.defaults.withCredentials = true;
