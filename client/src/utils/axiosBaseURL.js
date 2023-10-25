import axios from "axios";

export const axiosBaseURL = axios.create({
  baseURL: "https://voyanceapi.azurewebsites.net",
});

axiosBaseURL.defaults.withCredentials = true;
