import axios from "axios";

const token = localStorage.getItem("user")

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {  
    "Authorization" :JSON.parse(token || '{}'),
    "Content-type": "application/json"
  }
});