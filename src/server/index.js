import axios from 'axios';
import {smallOwnersUrl, YZPAGE} from './service';

// 查找城市图片关系所有信息
export function getAllCityAndPicAxios(){
    return axios.get(smallOwnersUrl( YZPAGE + 'cityPicture/tCityPicture/getAll'));
}

// 查找所有外部链接
export function getAllRouteAxios(){
    return axios.get(smallOwnersUrl( YZPAGE + 'serviceRouteRecords/tServiceRouteRecords/getAll'));
}

// 客户搜索记录插入
export function addSearchAxios(data){
    return axios.post(smallOwnersUrl(`${YZPAGE}searchrRecords/tSearchRecords/add`),data);
}

// 根据客户ID查找客户搜索记录信息按照搜索次数排序
export function getByFrequencyAxios(data){
    return axios.get(smallOwnersUrl( `${YZPAGE}searchrRecords/tSearchRecords/getByFrequency/${data.id}`));
}

// 根据客户ID查找客户搜索记录信息按照时间排序
export function getByIdAxios(data){
    return axios.get(smallOwnersUrl( YZPAGE + `searchrRecords/tSearchRecords/getById/${data.id}`));
}

// 首页搜索
export function getByNameDim(data){
    return axios.get(smallOwnersUrl( YZPAGE + `serviceRouteRecords/tServiceRouteRecords/getByNameDim/${data.serviceName}`));
}

// TBehaviorRecords插入
export function addRecordsAxios(data){
    return axios.post(smallOwnersUrl(`${YZPAGE}userbehaviorrecords/tBehaviorRecords/add`),data);
}
