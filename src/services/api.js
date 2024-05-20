import axios from "axios"

export const api = axios.create({
    baseURL: "https://rocketnotes-api-4e6r.onrender.com"
})