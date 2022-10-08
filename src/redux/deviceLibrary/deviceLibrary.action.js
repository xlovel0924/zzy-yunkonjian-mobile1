import { ALL_DEVICE_TYPE, DEVICE_LIST
} from '@/constants';

import { findAllAxios, findDeviceListAxios
} from '@/server/deviceLibrary';

import { Toast } from 'antd-mobile';
import history from '@/history';
import _ from 'lodash';

  function handleBack(){
    history.goBack();
  }

  function saveAllDeviceType(data){
    return { type:ALL_DEVICE_TYPE, payload:data}
  }

  function saveDeviceList(data){
    return { type:DEVICE_LIST, payload:data}
  }

  // 获取所有设备分类及分类下的设备用途 
  export function findAll(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await findAllAxios(payload);
      if(res.status===200){
        if(res.data.status){
          // console.log('待处理列表成功')
          // console.log(res.data.data)
          dispatch(saveAllDeviceType(res.data.data));
        }else{
          dispatch(saveAllDeviceType([]))
        }
      }else{
        dispatch(saveAllDeviceType([]))
      }
    }
  }

  // 获取分类,用途下的所有设备
  export function findDeviceList(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await findDeviceListAxios(payload);
      if(res.status===200){
        if(res.data.status){
          // console.log('待处理列表成功')
          // console.log(res.data.data)
          dispatch(saveDeviceList(res.data.data));
        }else{
          dispatch(saveDeviceList([]))
        }
      }else{
        dispatch(saveDeviceList([]))
      }
    }
  }

   // 清除分类,用途下的所有设备
   export function clearDeviceList(){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      dispatch(saveDeviceList([]))
    }
  }

