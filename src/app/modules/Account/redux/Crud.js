import axios from "axios"
import { baseURL } from "../../../../redux"

const BASE_URL = `${baseURL}/Users`;

export function getById(userId,AccessToken) {
  return axios.get(
    `${BASE_URL}/GetById?userId=${userId}`, {
      headers: {
       "Access-Control-Allow-Origin": "*",
       "Content-type": "Application/json",
       Authorization: `Bearer ${AccessToken}`,
     },
    }
  );
}