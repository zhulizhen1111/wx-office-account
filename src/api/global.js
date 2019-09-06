import wx from 'weixin-js-sdk';
import uuid from 'uuid';
import crypto from 'crypto';
import tools from 'utils/tools';

//通过config接口注入权限验证配置 
export function weChatConfig(fullPath) {
    const APPID = tools.getStorage('appid'); //appId
    console.log(APPID)
    const timestamp = Number.parseInt((+new Date()) / 1000)
    const nonceStr = uuid.v1()
    let createSignature = (timestamp, nonceStr) => {
        const jsapi_ticket = tools.getStorage('jsapi_ticket');
        // const str = `${process.env.BASE_URL}${urlparam}`
        // 没有用到调用时传过来的urlparam
        // alert(location.href.split('#')[0])
        // 记录进入app时的url
        if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
            window.entryUrl = location.href.split('#')[0]
        }
        // console.log( window.entryUrl,' window.entryUrl')
        // 进行签名的时候  Android 不用使用之前的链接， ios 需要
        //let url = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : process.env.BASE_URL + process.env.AUTHO_URI + '?code=' + tools.getStorage('code') + '&state=' + encodeURIComponent(tools.getStorage('state'));
        let baseUrl = 'http://' + document.domain
        let url = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : baseUrl + process.env.AUTHO_URI + '?code=' + tools.getStorage('code') + '&state=' + encodeURIComponent(tools.getStorage('state'));
        // console.log('页面实际的url= ', location.href)
        let string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
        // 将所有参数字符串拼接成一个字符串进行sha1加密，得到signature
        let md5sum = crypto.createHash('sha1')
        md5sum.update(string1, 'utf8')
        const signature = md5sum.digest('hex')
        return signature
    }
    wx.config({
        debug: false, //调试模式
        appId: APPID, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串nonceStr
        signature: createSignature(timestamp, nonceStr), // 必填，签名
        jsApiList: ['onMenuShareTimeline', 'chooseImage', 'previewImage', 'getLocalImgData', 'getLocation', 'scanQRCode', 'closeWindow']// 必填，需要使用的JS接口列表
        // onMenuShareTimeline: 分享到朋友圈的的js接口
        //chooseImage:拍照或从手机相册中选图接口
        //previewImage:预览图片接口
        //getLocalImgData:获取本地图片接口
        //getLocation:获取地理位置接口
        //scanQRCode:调起微信扫一扫接口
        //closeWindow:关闭当前网页窗口接口
    })

    wx.ready(() => {
        console.log(`wx is ready`)
    })
    wx.error(res => {
        console.log(`wx.error: ${res.errMsg}`)
    })
}

//权限验证结束执行
export function weChatReady() {
    return new Promise((resolve, reject) => {
        wx.ready(() => {
            console.log(`wx is ready`)
            resolve()
        })
    })
}

//拍照或从手机相册中选图接口
export function chooseImage(count) {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: count, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                //localIds的格式:["wxlocalResource://465437865486547686"] (苹果)
                //						:["weixin://resourceid/2c1e43254343"]{安卓}
                let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                resolve(localIds)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

//预览图片接口
export function previewImage(curr, urls) {
    wx.previewImage({
        current: curr, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
    })
}

//获取本地图片接口
export function getLocalImgData(localId) {
    return new Promise((resolve, reject) => {
        wx.getLocalImgData({
            localId: localId,
            success: res => {
                let localData = res.localData
                resolve(localData)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

//获取地理位置接口
export function getLocation() {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: res => {
                // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                // var speed = res.speed; // 速度，以米/每秒计
                // var accuracy = res.accuracy; // 位置精度
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}
//调起微信扫一扫接口
export function scanQRCode() {
    return new Promise((resolve, reject) => {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var resultStr = res.resultStr // 当needResult 为 1 时，扫码返回的结果
                if (resultStr) {
                    resolve(resultStr);
                } else {
                    reject('该二维码无效!')
                }
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

//关闭当前网页窗口接口
export function closeWindow(time = 1000) {
    setTimeout(() => {
        wx.closeWindow()
    }, time)
}

//分享朋友圈接口
export function onMenuShareTimeline({
    title,
    link
}) {
    return new Promise((resolve, reject) => {
        wx.ready(() => {
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, //
                imgUrl: 'http://osjykr1v3.bkt.clouddn.com/FsarJolRzNMNKpv8TcyOOLa9WovE', // 分享图标
                success: function (res) {
                    console.log(JSON.stringify(res))
                    resolve(res)
                },
                cancel: function (res) {
                    console.log(JSON.stringify(res))
                    resolve(res)
                    // 用户取消分享后执行的回调函数
                },
                fail: function (res) {
                    console.log(res)
                },
                trigger: function (res) {
                    console.log(JSON.stringify(res))
                }
            })
        })
    })
}