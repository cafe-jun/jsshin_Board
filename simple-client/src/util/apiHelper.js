import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    "Content-type": "application/json",
  },
});

export const fetchBoardList = apiClient.get("/board?page=1&itemCount=20");
