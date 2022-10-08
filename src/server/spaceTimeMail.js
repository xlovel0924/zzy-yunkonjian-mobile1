import axios from 'axios';
import { smallOwnersUrl, YZPAGE } from './service';


// 获取时空信箱列表数据
export function fetchMailListAxios(data) {
    if(data.isPublic===1){  // 公开
        return axios.post(smallOwnersUrl(YZPAGE + `spacetimeMailbox/tSpacetimeMailbox/findAllByPublic`),data)
    }else if(data.isPublic===0){
        return axios.post(smallOwnersUrl(YZPAGE + `spacetimeMailbox/tSpacetimeMailbox/findBymemorialById`),data)
    }
}


// 根据ID获取信件详情
export function fetchMailDetailAxios(data) {
    return axios.get(smallOwnersUrl(YZPAGE + `spacetimeMailbox/tSpacetimeMailbox/get?id=${data.id}`))
}

// 根据ID删除信件
export function deleteMailAxios(id) {
    return axios.get(smallOwnersUrl(YZPAGE + `spacetimeMailbox/tSpacetimeMailbox/delete?id=${id}`))
}







// export function APIThreeDimensional(data) {
//     return axios.get(smallOwnersUrl(YZFILE + `PhotoStudio/enliven?templateId=0&url=${data.url}`))
//     // return axios.post(smallOwnersUrl('PhotoStudio/enliven'), data)
// }

// export function APILookThreeD(id) {
//     return axios.post(smallOwnersUrl(YZFILE + `pkMessage/tPkNotification/findUrlByTaksId?taskId=${id}`))
// }