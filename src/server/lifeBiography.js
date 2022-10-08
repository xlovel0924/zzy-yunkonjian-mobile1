import axios from 'axios';
import { smallOwnersUrl, YZPAGE } from './service';

// 获取生平信息
export function getLifeBiography(data){
    return axios.post(smallOwnersUrl(YZPAGE + 'biography/tBiography/page'),data)
}

// 根据id查生平信息
export function getBiographyID(id){
    return axios.get(smallOwnersUrl(`${YZPAGE}biography/tBiography/get/${id}`))
}

// 修改生平信息
export function updateBiography(data){
    return axios.post(smallOwnersUrl(YZPAGE + 'biography/tBiography/update',data))
}

// 添加生平信息
export function addBiography(data){
    return axios.post(smallOwnersUrl(YZPAGE + 'biography/tBiography/add',this.$data))
}