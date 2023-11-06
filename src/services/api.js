import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    } 
});

const apiFetch = axios.create({
    baseURL: 'https://amcor.planteste.com.br/api/',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    } 
});

export { api, apiFetch };