import axios from 'axios';
import { smallOwnersUrl, YZFILE, YZPAGE } from './service';

// 黑白图片上色
export function APIColor(data) {
    return axios.get(smallOwnersUrl(YZFILE + `PhotoStudio/colour?url=${data}`))
    // return axios.get(smallOwnersUrl(`PhotoStudio/colour?url=${data}`))
}

// 模糊图片清晰
export function APIClear(data) {
    return axios.get(smallOwnersUrl(YZFILE + `PhotoStudio/repair?url=${data}`))
    // return axios.get(smallOwnersUrl(`PhotoStudio/repair?url=${data}`))
}

// 3D图片变活
export function APIThreeDimensional(data) {
    return axios.get(smallOwnersUrl(YZFILE + `PhotoStudio/enliven?templateId=0&url=${data.url}`))
    // return axios.post(smallOwnersUrl('PhotoStudio/enliven'), data)
}

// 3D视频第三方查找
export function APILookThreeD(id) {
    return axios.post(smallOwnersUrl(YZFILE + `pkMessage/tPkNotification/findUrlByTaksId?taskId=${id}`))
}

// 3D视频添加
export function APIAddThreeD(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'photoStudio/t3dPhoto/add'), data)
    // return axios.post('http://192.168.10.139:8005/photoStudio/t3dPhoto/add', data)
}

// 照片修复添加
export function APIAddColor(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'photoStudio/tPhotoInfo/add'), data)
    // return axios.post('http://192.168.10.139:8005/photoStudio/tPhotoInfo/add', data)
}

// 人生微电影
export function APIMicroMovies(data) {
    return axios.post(smallOwnersUrl(YZPAGE + 'microMovies/tMicroMovies/page'), data)
}

// 根据id查看模板
export function APILookMicroMovied(id) {
    return axios.get(smallOwnersUrl(YZPAGE + `microMovies/tMicroMovies/get?id=${id}`))
}

// base上传获取图片地址
export function APIBaseTypePhotot(data) {
    return axios.post(smallOwnersUrl(YZFILE + `commodity/StaticFile/base64Upload`), data)
}

// 根据url下载
export function APIUrlDownload(data) {
    return axios.post(smallOwnersUrl(YZFILE + `commodity/StaticFile/downloadFile`), data)
}

// 图片审核
export function APIPhotoReview(url){
    return axios.get(smallOwnersUrl(`${YZFILE}PhotoStudio/pictureReview?url=${url}`))
}