/**
 *@author: fugy
 *@date: 2018.10.18
 *@info: 朵朵报修的接口数据
 */
import service from './service';
import {
    FIXED_URL
} from 'api/config';

// 發送短信的接口
export function sendMsgCode({
    getParams
}) {
    let url = FIXED_URL + "/sendMsgCode";
    return service.getJson(url, getParams);
}
// 校验短信验证码
export function checkMsgCode(getParams) {
    let url = FIXED_URL + "/checkMsgCode";
    return service.getJson(url, getParams);
}
// 登錄
export function loginIn({
    postParams
}) {
    let url = FIXED_URL + "/login";
    return service.postJson(url, {}, postParams);
}
// 重置密码
export function getConfirm({
    postParams
}) {
    let url = FIXED_URL + "/changePwd";
    return service.postJson(url, {}, postParams);
}
//验证是否登录
export function isLogin({
    getParams
}) {
    let url = FIXED_URL + "/isLogin";
    return service.getJson(url, getParams);
}
// 查询用户所在项目
export function projects(getParams) {
    let url = FIXED_URL + '/user/getProjects'
    return service.getJson(url, getParams)
}
// 查询项目的汇总数据（人员，工单，环境）
export function querySummaryData({
    getParams
}) {
    let url = FIXED_URL + "/saas/querySummaryData";
    return service.getJson(url, getParams);
}
// 查询能耗
export function executingdDetail({
    getParams
}) {
    let url = FIXED_URL + "/isagy/getAnnualEnergy";
    return service.getJson(url, getParams)
}
// 年化风险值
export function accidentRisk({
    getParams
}) {
    let url = FIXED_URL + "/risk/getList";
    return service.getJson(url, getParams)
}
// 风险值超限
export function Transfinite({
    getParams
}) {
    let url = FIXED_URL + "/risk/getRisk";
    return service.getJson(url, getParams)
}
// 风险计算来源 查询本对象 点击设备
export function sourcesRisk({
    getParams
}) {
    let url = FIXED_URL + "/risk/getRiskSourceByObj";
    return service.getJson(url, getParams)
}
// 风险计算来源 查询下级对象 点击P值
export function SourceFatherObjPFlag({
    getParams
}) {
    let url = FIXED_URL + "/risk/getRiskSourceByFatherObjPFlag";
    return service.getJson(url, getParams)
}