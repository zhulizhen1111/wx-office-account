import service from "./service";

// 查询应急预案
export function QueryEventReport({ postParams }) {
    return service.postJson(`/duoduo-service/manage-service/manage/plan/query`, {}, postParams)
}
//  根据用户id查询应急预案掌握
export function QueryIncident({ postParams }) {
    return service.postJson(`/server/manage/queryPlanMasterByPerson`, {}, postParams)
}
//查询事件报告
export function QueryReport({ postParams }) {
    return service.postJson(`/duoduo-service/manage-service/manage/presentation/query`, {}, postParams)
}
//查询 - 应急预案掌握
export function queryPlan({ postParams }) {
    return service.postJson(`/server/manage/queryPlanMaster`, {}, postParams)
}
//设备详情的接口
export function queryEquipManetPosition({ postParams }) {
    return service.postJson(`/server/object/position/queryEquipManetPosition`, {}, postParams)
}
//查询设备类
export function categoryQuery({ postParams }) {
    return service.postJson(` /duoduo-service/object-service/object/category/query`, {}, postParams)
}
//查询空间信息
export function querySpacePosition({ postParams }) {
    return service.postJson(`/server/object/position/querySpacePosition`, {}, postParams)
}
//查询空间功能类型
export function QuerySpaceCategory({ getParams }) {
    return service.getJson(`/duoduo-service/object-service/dataplatform/dict/query/space`, getParams)
}
//创建督办事项
export function creatSupervise({ postParams }) {
    return service.postJson(`/duoduo-service/manage-service/manage/supervise/create`,{}, postParams)
}
//查询督办事项
export function querySupervise({ postParams }) {
    return service.postJson(`/duoduo-service/manage-service/manage/supervise/query`,{}, postParams)
}
//督办事项详情
export function detailSupervise({ getParams }) {
    return service.getJson(`/duoduo-service/manage-service/manage/supervise/detail`, getParams)
}
//更新督办事项
export function updateSupervise({ postParams }) {
    return service.postJson(`/duoduo-service/manage-service/manage/supervise/update`,{}, postParams)
}
//改变督办事项状态
export function setSuperviseStatus({ postParams }) {
    return service.postJson(`/duoduo-service/manage-service/manage/supervise/setStatus`,{}, postParams)
}