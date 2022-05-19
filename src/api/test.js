import request from "../utils/request";

export function test(params) {
    return request({
        url: '/test',
        method: 'get',
        params
    })
}
