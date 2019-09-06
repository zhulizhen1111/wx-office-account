import axios from 'axios'
import {
  Toast
} from 'mint-ui';
import tools from '@/utils/tools'

function execute(config) {
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      if (response.status == 200) {
        resolve(response.data)
      } else {
        Toast('this is a response error')
        reject(response.data)
      }
    }).catch(error => {
      Toast('this is a http error');
      reject(error)
    })
  })
}

function getJson(url, params) {
  return execute({
    url: url,
    params: params,
    method: 'GET'
  })
}

function postJson(url, params, data) {
  return execute({
    url: url,
    params: params,
    data: data,
    method: 'POST'
  })
}
// request拦截器
// axios.interceptors.request.use(config => {
//   // Do something before request is sent
//   //携带pubname
//   let pubname = tools.getStorage('pubname') ? tools.getStorage('pubname') : 'development.env.pubname';
//   let openid = tools.getSessStorage('openid') ? tools.getSessStorage('openid') : '';
//   let url = config.url;
//   let flag = (url.indexOf('wechat/getToken') > -1 || url.indexOf('wechat/oauth2') > -1);
//   let projectId = tools.getStorage('projectId') || 'Pj4419000005'
//   if (!flag) {
//     url += '?pubname=' + pubname + '&openid=' + openid + '&projectId=' + projectId;
//   } else {
//     url += '?pubname=' + pubname;
//   }
//   config.url = url;
//   //携带openid
//   return config
// }, error => {
//   Promise.reject(error)
// })

// //respone拦截器
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     return Promise.reject(error)
//   }
// )

axios.interceptors.request.use(config => {
    // Do something before request is sent
    //携带pubname
    // let pubname = tools.getStorage('pubname') ? tools.getStorage('pubname') : '';
    // let openid = tools.getSessStorage('openid') ? tools.getSessStorage('openid') : '';
    let pubname = 'sagahyy'
    let openid = ' 1'
    let url = config.url;
    let flag = (url.indexOf('wechat/getToken') > -1 || url.indexOf('wechat/oauth2') > -1);
    if (!flag) {
        url += '?pubname=' + pubname + '&openid=' + openid + '&projectId=' + 'Pj4419000005';
    } else {
        url += '?pubname=' + pubname;
    }
    config.url = url;
    //携带openid
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
export default {
  getJson: getJson,
  postJson: postJson
}
