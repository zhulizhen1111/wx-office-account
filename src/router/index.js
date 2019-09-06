import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import tools from '../utils/tools';
import store from '../store';

Vue.use(Router)

const router = new Router({
    base: '',
    mode: 'history',
    routes: routes
})
/**
 * 1、pubname: (1) 存storage (0)去storage取（取到，取不到就找不到）
 * 2、openId：(1)继续 (0)(存路径为了授权跳转，去授权)
 */
// const ignore = ['/login', '/logout', '/nofound', '/author', '/forgetPwd', '/checkPwd']
// router.beforeEach((to, from, next) => {
//     // let pubname = to.query.pubname;
//     let pubname = 'sagahyy'
//     if (pubname) {
//         tools.setStorage('pubname', pubname); // 保存pubname到本地
//     }
//     let fullPath = to.fullPath;
//     let path = to.path;
//     if (ignore.includes(path)) {
//         next()
//         return
//     }
//     if (tools.getStorage('pubname')) { // 判断本地是否有pubname
//         let openId = store.getters.openId || tools.getSessStorage('openid');
//         //是否有openId
//         if (openId) {
//             let username = tools.getStorage('username')
//             if (username) {
//                 next()
//             } else {
//                 next({ path: '/login',replace:true })
//             }
//         } else {
//             tools.setStorage('fullPath', fullPath);
//             next({
//                 path: '/author?state=' + fullPath,replace:true
//             });
//         }
//     } else {
//         next({
//             path: '/nofound'
//         }) // 本地没有pubname
//     }
// })
export default router