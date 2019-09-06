<template>
    <div class='author'>
        <div class='loading'>
            <span></span>
        </div>
        <div class='loadingText' v-text='msg'></div>
    </div>
</template>
<script type="ecmascript-6">
import { Toast } from 'mint-ui'

import tools from 'utils/tools'
import api from '@/api/author'

export default {
    name: 'author',
    data() {
        return {
            msg: '正在加载，请稍后...'
        }
    },
    methods: {
        author() {
            //是否是微信内置浏览器
            let ua = window.navigator.userAgent.toLowerCase()
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                // 未授权
                // 根据请求地址是否有code参数判断是否是微信回调和是否授权
                let code = this.$route.query.code
                let state = this.$route.query.state //为了apple的wx——config
                if (code) {
                    // 处理微信回调 根据code从后台获取openid accessToken
                    api.getAccessToken({ getParams: { code: code } }).then(res => {
                        let { result, openid, access_token, refresh_token } = res
                        if (result === 'success') {
                            this.$store.commit('SER_ACCESS_TOKEN', access_token)
                            this.$store.commit('SER_OPENID', openid)
                            tools.setSessStorage('openid', openid)
                            tools.setStorage('code', code)
                            tools.setStorage('state', state)
                            let fullPath = tools.getStorage('fullPath') //授权成功调到指定页面
                            this.$router.replace(fullPath)
                        } else {
                            Toast('网络连接超时...请重新打开！！！')
                        }
                    })
                } else {
                    //获取getToken(appid)
                    let state = 'author'
                    //获取token
                    api.getToken().then(res => {
                        let { result, appid, ticket } = res
                        if (result === 'success') {
                            tools.setStorage('appid', appid)
                            tools.setStorage('jsapi_ticket', ticket)
                            // 发起授权请求
                            //let redirectUri = process.env.BASE_URL + process.env.AUTHO_URI;
                            let redirectUri = 'http://' + document.domain + process.env.AUTHO_URI
                            redirectUri = encodeURIComponent(redirectUri)
                            let url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
                            url = url + '?appid=' + appid
                            url = url + '&redirect_uri=' + redirectUri
                            url = url + '&response_type=code&scope=snsapi_base'
                            url = url + '&state=' + state
                            url = url + '&connect_redirect=1'
                            url = url + '&connect_redirect=1'
                            url = url + '#wechat_redirect'
                            window.location.href = url
                        }
                    })
                }
            } else {
                this.msg = '请使用微信内置浏览器打开'
            }
        },
        goBack() {
            setTimeout(() => {
                tools.goBeforeLoginUrl()
            }, 1000)
        }
    },
    created() {
        this.author()
    }
}
</script>
<style scoped lang="less">
@rem: 30rem;
.author {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .loading {
        width: 480 / @rem;
        height: 480 / @rem;
        margin: 180 / @rem auto;
        border-width: 30 / @rem;
        border-style: solid;
        border-color: #44b197;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-radius: 50%;
        animation: rotates 1s ease-out infinite;
    }
    .loadingText {
        width: 100%;
        line-height: 48 / @rem;
        font-size: 48 / @rem;
        text-align: center;
        color: #44b197;
    }
}

@keyframes rotates {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>