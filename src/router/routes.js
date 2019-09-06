const routes = [
  {
    // author
    path: '/author',
    name: 'author',
    component: () => import('views/author')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login')
  },
  //查看预案
  {
    path: '/advance',
    name: 'advance',
    component: () => import('views/advance')
  },
  //查看报告
  {
    path: '/report',
    name: 'report',
    component: () => import('views/report')
  },
  //查看掌握情况
  {
    path: '/case',
    name: 'case',
    component: () => import('views/case')
  },
  //单人应急掌握情况
  {
    path: '/oneCase',
    name: 'oneCase',
    component: () => import('views/oneCase/index.vue')
  },
  //设备详情
  {
    path: '/device',
    name: 'device',
    component: () => import('views/device/index.vue')
  },
  //空间详情
  {
    path: '/space',
    name: 'space',
    component: () => import('views/space/index.vue')
  },
  {
    path: '/checkPwd',
    name: 'checkPwd',
    component: () => import('views/checkPwd')
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: () => import('views/forgetPwd')
  },
  {
    path: '/changeProject',
    name: 'changeProject',
    component: () => import('views/changeProject')
  },
  {
    path: '/',
    name: 'first',
    component: () => import('views/first')
  },
  {
    path: '/risk',
    name: 'risk',
    component: () => import('views/risk') //业主督办
  },
  {
    path: '/creatRisk',
    name: 'creatRisk',
    component: () => import('views/risk/creatRisk') //创建业主督办
  },
  {
    path: '/lookRisk',
    name: 'lookRisk',
    component: () => import('views/risk/lookRisk') //查看业主督办
  },
  {
    path: '/editRisk',
    name: 'editRisk',
    component: () => import('views/risk/editRisk') //编辑业主督办
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('views/progress')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('views/detail')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('views/logout')
  },
  {
    // 404
    path: '*',
    name: 'nofound',
    component: () => import('views/nofound')
  }
]

export default routes
