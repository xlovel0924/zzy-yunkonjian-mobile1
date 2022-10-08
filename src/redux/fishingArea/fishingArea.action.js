import { Toast } from 'antd-mobile';
import _ from 'lodash';
import {  FISHINGAREA_LIST, ERROR_MSG } from '@/constants';
import { fishingAreaAxios } from './../../server/homePage';

// 错误信息提示
function errorMsg(message){
  Toast.info(message, 1.5);
  return {message, type:ERROR_MSG}
}


// 请求渔区信息成功
function fishingAreaSuccess(data){
  return { type:FISHINGAREA_LIST, payload:data}
}

// 请求成功，但返回空数据时提示信息
function emptyData(msg){
  Toast.fail(msg, 1);
}

// 请求获取渔区信息
export function findFishingArea(){
  let token = localStorage.getItem('token');
  var param = {token:JSON.parse(token)};
  return async dispatch=>{
    const res = await fishingAreaAxios(param);
    if(res.status===200){
      if(res.data.status){
        if(!_.isEmpty(res)){
          dispatch(fishingAreaSuccess(res.data.data))
          if(!_.isEmpty(res.data.data.fishingArea[0].coordinateGroup)){
            const allLatlng =res.data.data.fishingArea[0].coordinateGroup.split(',')
            let lat='0';
            let lng='0';
            // 拼接坐标信息
            for (let i = 0; i < 2; i+=1) {
              const element = allLatlng[i];
              const du = element.split('°')
              const fen = du[1].split("'")[0]
              const miao = du[1].split("'")[1].split('"')[0]
              const zuobiao = (parseFloat(du)+parseFloat(fen)/60+parseFloat(miao)/3600).toFixed(6);
              if(i%2===0){
                  lat=zuobiao
              }else{
                  lng=zuobiao
              }
            };
            const latlng=[lat,lng]
            if(latlng!==['0','0']){
              sessionStorage.setItem('backCenter_center',JSON.stringify(latlng))
            }
          }
        }else{
          emptyData('没有查询到标绘信息')
        }
      }else{
        dispatch(errorMsg(res.data.message))
      }
    }else{
      dispatch(errorMsg('没有查询到标绘信息'))
    }
  }
}

// 清除渔区信息
export function clearFishingArea(){
  return async dispatch=>{
    dispatch(fishingAreaSuccess({}))
  }
}

export function newAlarmToast(){
  // console.log('newAlarmToast')
  return async dispatch=>{
    dispatch(errorMsg('有新报警信息'))
  }
}