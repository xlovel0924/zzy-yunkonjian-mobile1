// import qs from 'qs';
import axios from 'axios';
import { smallOwnersUrl } from './service';


  // 查询所有的设备分类及分类下的设备用途 POST /app/findDeviceList
  export function findAllAxios(data){
    return axios.post(smallOwnersUrl('app/findAll'),data);
  }

  // 查询设备列表 
  export function findDeviceListAxios(data){
    return axios.post(smallOwnersUrl('app/findDeviceList'),data);
  }