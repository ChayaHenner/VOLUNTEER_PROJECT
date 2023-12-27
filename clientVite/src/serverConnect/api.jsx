import axios from "axios";
export const SERVER_URL = "http://localhost:3001" //change to render
import Cookies from 'js-cookie';
export const fieldsEnum = ['children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'];



export const apiRequest = async (_url, _method, _body = {}) => {
    try {
      let resp = await axios({
        url: _url,
        method: _method,
        data: _body,
        headers: {
          "x-api-key": Cookies.get('token')
        }
      })
      return resp;
    }
    catch (err) {
      throw err;
    }
  }
  
export const apiRequestGet = async (_url) => {
    try {
      let resp = await axios({
        url: _url,
        method: "GET",
        headers: {
          "x-api-key": Cookies.get('token')
        }
      })
      return resp;
    }
    catch (err) {
      throw err;
    }
  }