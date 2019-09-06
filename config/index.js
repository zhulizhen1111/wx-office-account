// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");
var buildEnv = require("./prod.env");
var devEnv = require("./dev.env");
//所有代理配置
const proxyTables = [
  "/sns/oauth2/access_token",
  "/cgi-bin/user/info",
  "/wx",
  "/wechat"
];
let proxyTable = {
  "/server": {
    target: ' http://192.168.20.102:8084',
    // target: "http://hyy.wechat.sagacloud.cn",
    changeOrigin: true,
    pathRewrite: {
      // "^/apis": ""
    }
  },
  "/duoduo-service": {
    target: ' http://192.168.20.102:8084',
    // target: "http://hyy.wechat.sagacloud.cn",
    changeOrigin: true,
    pathRewrite: {
      // "^/apis": ""
    }
  },
  "/wechat": {
    target: ' http://192.168.20.102:8084',
    // target: " http://wetest.sagacloud.cn",
    changeOrigin: true
  },
  "/image-service": {
    // target: 'http://192.168.20.40:52009',git
    target: "http://api.sagacloud.cn/dp-auxiliary/",
    changeOrigin: false,
    // pathRewrite: {
      // "^/apis": ""
    // }
  },
  "/graphy-service": {
    target: "http://192.168.20.225:8080/",
    pathRewrite: {
      "^/graphy-service": "/"
    },
    ws: true,
    // 将主机标头的原点更改为目标URL
    changeOrigin: false
  }
};
// proxyTables.forEach((item, index) => {
//     if (item == '/wx') {
//         proxyTable[item] = {
//             target: 'https://api.weixin.qq.com',
//             changeOrigin: true
//         }
//     } else {
//         proxyTable[item] = {
//             target: `${JSON.parse(devEnv.BASE_URL)}/`,
//             changeOrigin: true,
//         }
//     }
// })

module.exports = {
  build: {
    env: buildEnv,
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "./static",
    assetsPublicPath: "/",
    staticPath: "./", //生产环境 staticPath:''
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: devEnv,
    autoOpenBrowser: true,
    assetsSubDirectory: "",
    assetsPublicPath: "/",
    staticPath: "/",
    proxyTable: proxyTable,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
