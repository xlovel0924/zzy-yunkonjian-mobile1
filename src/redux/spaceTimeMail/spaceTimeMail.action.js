import {  
  SPACE_TIME_MAIL_LIST, SPACE_TIME_MAIL_DETAIL
} from '@/constants';

import { 
  fetchMailListAxios, fetchMailDetailAxios, deleteMailAxios
} from '@/server/spaceTimeMail';

import { Toast } from 'antd-mobile';
import history from '@/history';
import _ from 'lodash';

  function handleBack(){
    history.goBack();
  }

  // 保存设备详情
  // function dviceInfo(data){
  //   return { type:DEVICE_INFO, payload:data}
  // }

  // 保存信列表
  function saveMailList(data){
    return { type:SPACE_TIME_MAIL_LIST, payload:data}
  }

   // 保存信详情
   function saveMailDetail(data){
    return { type:SPACE_TIME_MAIL_DETAIL, payload:data}
  }


  // 获取信件列表
  export function fetchMailList(payload){
    const param = payload
    return async dispatch=>{
      const res = await fetchMailListAxios(param);
      if(res.status===200){
        if(res.data.status){
          dispatch(saveMailList(res.data));
        }else{
          dispatch(saveMailList([]));
        }
      }else{
        dispatch(saveMailList([]));
      }
    }
  }

    // 根据id删除信件
    export function deleteMail(payload){
      const param = payload
      return async dispatch=>{
        const res = await deleteMailAxios(param);
        if(res.status===200){
          if(res.data.flag){
            Toast.success('删除成功',1.2);
          }else{
            Toast.fail('删除失败',1.2);
          }
        }else{
          Toast.fail('删除失败',1.2);
        }
      }
    }

  

  // 获取信件详情
  export function fetchMailDetail(payload){
    const param = payload
    return async dispatch=>{
      const res = await fetchMailDetailAxios(param);
      if(res.status===200){
        if(res.data.status){
          dispatch(saveMailDetail(res.data));
        }else{
          dispatch(saveMailDetail({}));
        }
      }else{
        dispatch(saveMailDetail({}));
      }
    }
  }

  


  // // 清除待执行任务点位设备列表 
  // export function clearPointDeviceList(){
  //   return async dispatch=>{
  //     dispatch(savePointDeviceList([]));
  //   }
  // }

  // // 手动添加待领取任务
  // export function addTask(payload){
  //   return async dispatch=>{
  //     const res = await addTaskAxios(payload);
  //     if(res.status===200){
  //       if(res.data.status){
  //         Toast.success('添加成功', 1.2)
  //       }else{
  //         Toast.info('添加失败false', 1.2)
  //       }
  //     }else{
  //       Toast.info('添加失败200', 1.2)
  //     }
  //   }
  // }
