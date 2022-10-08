import qs from 'qs';
import axios from 'axios';
import { dalianUrl,smallOwnersUrl } from './service';

// 获取渔区列表  
export function fishingAreaAxios(data){
  return axios.post(smallOwnersUrl('find'),data);
}

// 获取摄像头列表
export function findCameraListAxios(data){
  return axios.post(dalianUrl('device/infos'),qs.stringify(data),
  {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
}

// 获取未处理报警列表
export function alarmPendingListAxiosMock(data){
  return axios.post(smallOwnersUrl('alarm/list'),data);
}
//报警解除
export function alarmReleaseAxiosMock(data){
  return axios.post(smallOwnersUrl('alarm/relieve'),data);
}

// 报警已处理
export function alarmFinishAxiosMock(data){
  return axios.post(smallOwnersUrl('alarm/list'),data);
}
