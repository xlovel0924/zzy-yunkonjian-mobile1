import { Toast } from 'antd-mobile';
import _ from 'lodash';
import { CAMERA_LIST, ERROR_MSG } from '@/constants';
import { findCameraListAxios, findCameraInfoAxios } from './../../server/homePage';

// 错误信息提示
function errorMsg(message){
  Toast.fail(message, 1);
  return {message, type:ERROR_MSG}
}

// 请求渔区信息成功
function findCameraSuccess(data){
  return { type:CAMERA_LIST, payload:data}
}

// 请求成功，但返回空数据时提示信息
function emptyData(msg){
  Toast.fail(msg, 1);
}

function clearCameraListSuccess(data){
  return { type:CAMERA_LIST, payload:data}
}

// 清除摄像机信息
export function clearCameraList(){
  return async dispatch=>{
    dispatch(clearCameraListSuccess({}))
  }
}

// 请求获取摄像头ID列表
export function findCameraList(startTime,endTime){
  let token = JSON.parse(localStorage.getItem('token'));
  var param = {token};
  return async dispatch=>{
    const res = await findCameraListAxios(param);
    if(res.status===200){
      if(res.data.status){
        if(!_.isEmpty(res.data.data)){
          if(!_.isEmpty(startTime) && !_.isEmpty(endTime)){
            dispatch(findCameraInfoList(res.data.data,startTime,endTime))
          }else{
            dispatch(findCameraInfoList(res.data.data))
          }
        }else{
          emptyData('没有查询到监控信息')
        }
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    }else{
      dispatch(errorMsg(res.statusText))
    }
  }
}

function  findCameraInfoList(idList,startTime,endTime){
  let token = JSON.parse(localStorage.getItem('token'));
  var param = {token,deviceIdList:idList};
  return async dispatch=>{
    const res = await findCameraInfoAxios(param);
    if(res.status===200){
      if(res.data.status){
        if(!_.isEmpty(res.data.data)){
          if(!_.isEmpty(startTime) && !_.isEmpty(endTime)){
            dispatch(findCameraSuccess(res.data.data,startTime,endTime))
          }else{
            dispatch(findCameraSuccess(res.data.data))
          }
        }else{
          emptyData('没有查询到监控信息')
        }
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    }else{
      dispatch(errorMsg(res.statusText))
    }
  }
}