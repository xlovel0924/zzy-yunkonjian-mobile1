// import qs from 'qs';
import axios from 'axios';
import { smallOwnersUrl } from './service';


  // 查询当前位置是否在点位内  如果在将返回true及点位ID,点位名,message提示信息  POST /
  export function clockInAreaAxiox(data){
    return axios.post(smallOwnersUrl('app/clockInArea'),data);
  }

  // 查询当天签到信息(日期(年月日), 用户ID) POST /T_SignRecord_Info/insert
  export function findSignInfoAxiox(data){
    return axios.post(smallOwnersUrl('T_SignRecord_Info/findSignRecordBySignNodeID'),data);
  }

  // 签到接口
  export function signInAxiox(data){
    return axios.post(smallOwnersUrl('T_SignRecord_Info/insert'),data);
  }

  // 查询签到列表信息( paramMap内放用户ID )
  export function findSignListAxiox(data){
    return axios.post(smallOwnersUrl('T_SignRecord_Info/page'),data);
  }