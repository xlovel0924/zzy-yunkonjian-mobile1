// import qs from 'qs';
import axios from 'axios';
import { smallOwnersUrl } from './service';


  // 获取所有消息
  export function findAllNoticeAxios(data){
    return axios.post(smallOwnersUrl('notice/appList'),data);
  }


  // 获取消息详情
  export function findNoticeDetailAxios(data){
    return axios.post(smallOwnersUrl('notice/detail'),data);
  }