import axios from 'axios';
import { smallOwnersUrl, YZPAGE } from './service';

// 获取渔区列表  
export function fishingAreaAxios(data){
  return axios.post(smallOwnersUrl('findFishingArea'),data);
}

// 获取摄像头列表(大连接口)
export function findCameraListAxios(data){
  return axios.post(smallOwnersUrl('device/list'),data);
}

// 查询24小时前历史数据(大连接口)
export function findHistory24hAxios(data){
  return axios.post('http://smartersea.cn:10002/wanhigh-center/ship/alarm/24h/history',data);
}

// 查询ais历史数据(大连接口)
export function findAisHistoryAxios(data){
  return axios.post('http://smartersea.cn:10002/wanhigh-center/ship/history',data);
}

// 查询arpa历史数据(大连接口)
export function findArpaHistoryAxios(data){
  return axios.post('http://smartersea.cn:10002/wanhigh-center/ship/radar/history',data);
}


// 查询aisList(临时URL)
export function findAisListAxios(data){
  return axios.post('http://smartersea.cn:10002/wanhigh-center/ship/getAreaShip',data);
}

// 查询arpaList(未测试)
export function findArpaListAxios(data){
  return axios.post('http://smartersea.cn:10002/wanhigh-center/ship/getAreaShip',data);
}

// 查询监控详情
export function findCameraInfoAxios(data){
  return axios.post('http://smartersea.cn:10002/wanhigh-center/device/info',data);
}

// 测试接口
export function testAxios(data){
  return axios.post('http://smartersea.cn:10003/ais-collect/sendMsg',data);
}
// 测试雷达接口
export function testRadarAxios(data){
  return axios.post('http://smartersea.cn:10005/radar-collect/sendMsg',data);
}

// 特殊日期提醒
export function querySpecialHolidayReminders(id){
  return axios.get(smallOwnersUrl(`${YZPAGE}memorial/tSpecialHolidays/querySpecialHolidayReminders/${id}`))
}