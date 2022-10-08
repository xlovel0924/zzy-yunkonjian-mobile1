import axios from 'axios';
import { smallOwnersUrl, LOGINPRE, YZPAGE, YZFILE, BASE_URL_STATIC, YZFront } from './service';

// 根据id查询用户信息
export function ApiGetUserInfos(id) {
    return axios.get(smallOwnersUrl(LOGINPRE + `login/tMemberinfo/get?id=${id}`))
    // return axios.get(smallOwnersUrl(`login/tMemberinfo/get?id=${id}`))
}

// 更新用户信息
export function ApiUpdateUserInfos(data) {
    return axios.post(smallOwnersUrl(LOGINPRE + `login/tMemberinfo/update`), data)
    // return axios.post(smallOwnersUrl(`login/tMemberinfo/update`),data)
}

// 我的预约
export function ApiMySubscribe(data) {
    return axios.post(smallOwnersUrl(`${YZFront}booked/booked/queryBookedByUserId`), data)
    // return axios.post('http://192.168.10.175:8001/booked/booked/queryBookedByUserId', data)
}

// 添加预约
export function ApiAddSubscribe(data) {
    return axios.post(smallOwnersUrl(`${YZFront}booked/booked/addBooked`), data)
    // return axios.post('http://192.168.10.175:8001/booked/booked/addBooked', data)
}

// 根据id查照片修复信息
export function ApiLookMyPhoto(data) {
    return axios.post(smallOwnersUrl(YZPAGE + `photoStudio/tPhotoInfo/page`), data)
}

// 删除之前的头像图片
export function DelHeadImg(data) {
    // return axios.post(smallOwnersUrl(YZFILE + `commodity/StaticFile/fileDelete`), data)
    return axios.post(BASE_URL_STATIC + `commodity/StaticFile/fileDelete`, data)
}

// 根据id查看3D信息
export function ApiLookThreeD(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'photoStudio/t3dPhoto/page'), data)
}

// 云空间容量
export function ApiCloudCapacity(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'memberBenefits/tMemberBenefits/cloudCapacity'), data)
}