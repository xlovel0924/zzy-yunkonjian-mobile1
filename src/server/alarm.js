// import qs from 'qs';
import axios from 'axios';
import { smallOwnersUrl } from './service';
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
  // 报警详情
  export function alarmviewAxiosMock(data){
    return axios.post(smallOwnersUrl('alarm/info'),data);
  }
    