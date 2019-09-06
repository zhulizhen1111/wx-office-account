/**
*@author: fugy
*@date: 2018.10.08
*@info: 微信授权的接口服务
 */
import service from "./service";
import config from "./config";
const TOKEN_URL = config.TOKEN_URL;

const api = {
    // 获取token
    getToken: function () {
        let url = TOKEN_URL + "/getToken";
        return service.getJson(url);
    },
    getAccessToken: function ({ getParams }) {
        let url = TOKEN_URL + "/oauth2/accessToken";
        return service.getJson(url, getParams);
    },
}
export default api;