import axios, { AxiosHeaders } from "axios"
import { Key } from "./constants"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(Key.TOKEN)

  if (token)
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`)
  return config
})
