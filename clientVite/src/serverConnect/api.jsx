import axios from "axios";
export const SERVER_URL = "http://localhost:3001" //change to render
export const TOKEN_NAME = "TOKEN"

export const apiRequest = async (_url, _method, _body = {}) => {
    try {
      console.log("request body :",_body)
      let resp = await axios({
        url: _url,
        method: _method,
        data: _body,
        headers: {
          "x-api-key": localStorage[TOKEN_NAME]
        }
      })
      return resp;
    }
    catch (err) {
      throw err;
    }
  }