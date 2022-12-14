import request from "@/utils/request";

export function getBanner() {
    return request({
        url: '/mq/mqbiz/mqHomepageImage/outside/list',
        method: 'get',
    });
}
export function getNewsType() {
    return request({
        url: '/mq/mqbiz/mqInfoType/outside/list',
        method: 'get',
    });
}
export function getNewsInfo(data: object) {
    return request({
        url: '/mq/mqbiz/mqInfo/outside/list',
        method: 'get',
        data
    });
}
export function mqCompanyAddress() {
    return request({
        url: '/mq/mqbiz/mqCompanyAddress/outside/list',
        method: 'get',
    });
}
export function queryById(data: object) {
    return request({
        url: '/mq/mqbiz/mqInfo/outside/queryById',
        method: 'get',
        data
    });
}
export function addInfo(data: object) {
    return request({
        url: '/mq/mqbiz/mqSettlementEvaluation/outside/add',
        method: 'post',
        data
    });
}
export function addNewContact(data: object) {
    return request({
        url: '/mq/mqbiz/mqNewContact/outside/addNewContact',
        method: 'post',
        data
    });
}
export function addmqMembers(data: object) {
    return request({
        url: '/mq/mqbiz/mqMembers/outside/add',
        method: 'post',
        data
    });
}