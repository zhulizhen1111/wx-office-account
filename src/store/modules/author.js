/**
 *@author: fugy
 *@date: 2018.10.08
 *@info: wx授权信息
 */
var author = {
    state: {
        openId: '',
        sccess_token: '',
    },
    getters: {
        openId: state => state.openId,
        sccess_token: state => state.sccess_token
    },
    mutations: {
        SER_OPENID(state, openId) {
            state.openId = openId;
        },
        SER_ACCESS_TOKEN(state, sccess_token) {
            state.sccess_token = sccess_token;
        }
    },
    actions: {

    }
}
export default author