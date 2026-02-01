import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const api = axios.create({
  baseURL: baseUrl,
  headers: {'content-type':'application/json'}
  ,
});


export async function getTrackId (id: string) {
  return api.get(`/campers/${id}`);
}