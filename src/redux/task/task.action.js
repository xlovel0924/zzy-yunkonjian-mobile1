import {  PENDING_TASK_LIST, PROCESSING_TASK_LIST, POINT_LIST, POINT_DEVICE_LIST, DEVICE_INFO, FINISH_TASK_LIST, EXCEPTION_SUBMIT_STATUS,
    GRID_TREE, WILL_PAYLOAD, GRID_LIST, OVERTIME_TASK_LIST,
} from '@/constants';

import { pendingTaskAxios, processingTaskAxios, getTaskAxios, returnTaskAxios, pointListAxios, pointDeviceListAxios, addTaskAxios, 
  exceptionSubmitAxios, getGridTreeAxios, pointListReportAxios, reportSubmitAxios, fetchGridAxios,
  doSBXJAxios, doSBBYAxios, doSBYXAxios, saveSBXJAxios, saveSBBYAxios, saveSBYXAxios, doSJSBAxios, doSBBXAxios,
  scanPointAxios, scanDeviceAxios,
} from '@/server/task';

import { Toast } from 'antd-mobile';
import history from '@/history';
import _ from 'lodash';

  function handleBack(){
    history.goBack();
  }

  function savePendingTask(data){
    return { type:PENDING_TASK_LIST, payload:data}
  }
  
  function saveProcessingTask(data){
    return { type:PROCESSING_TASK_LIST, payload:data}
  }

  function saveOverTimeTask(data){
    return { type:OVERTIME_TASK_LIST, payload:data}
  }

  function saveFinishTask(data){
    return { type:FINISH_TASK_LIST, payload:data}
  }

  function savePointList(data){
    return { type:POINT_LIST, payload:data}
  }

  function savePointDeviceList(data){
    return { type:POINT_DEVICE_LIST, payload:data}
  }

  // 保存设备详情
  function dviceInfo(data){
    return { type:DEVICE_INFO, payload:data}
  }

  // 获取网格树
  function saveGridTree(data){
    return { type:GRID_TREE, payload:data}
  }

  // 保存异常上报提交状态
  function saveExceptionSubmitStatus(data){
    return { type:EXCEPTION_SUBMIT_STATUS, payload:data}
  }

  // 进入异常上报页面暂存设备巡检标准数据 
  function saveWillPayloadData(data){
    return { type:WILL_PAYLOAD, payload:data}
  }

  // 点位列表,每条数据的网格信息
  function saveGridList(data){
    return { type: GRID_LIST, payload:data}
  }

  // 清除提交状态
  export function clearExceptionSubmitStatus(){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      dispatch(saveExceptionSubmitStatus(false));
    }
  }

  // 进入异常上报页面暂存设备巡检标准数据
  export function saveWillPayload(data){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      dispatch(saveWillPayloadData(data));
    }
  }

  // 保存设备详情
  export function saveDeviceInfo(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      dispatch(dviceInfo(payload));
    }
  }

  // 获取待领取任务列表(待领取drawState:'0' ; 已完成 drawState:'1')
  export function pendingTask(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await pendingTaskAxios(payload);
      if(res.status===200){
        if(res.data.status){
          // console.log('待处理列表成功')
          // console.log(res.data.data)
          dispatch(savePendingTask(res.data.data));
        }else{
          dispatch(savePendingTask([]))
        }
      }else{
        dispatch(savePendingTask([]))
      }
    }
  }

  // 获取待执行任务列表 
  export function processingTask(payload){
    const param = payload
    return async dispatch=>{
      const res = await processingTaskAxios(param);
      if(res.status===200){
        if(res.data.status){
          dispatch(saveProcessingTask(res.data.data));
        }else{
          dispatch(saveProcessingTask([]));
        }
      }else{
        dispatch(saveProcessingTask([]));
      }
    }
  }

    // 获取已超时任务列表 
    export function overTimeTask(payload){
      const param = payload
      return async dispatch=>{
        const res = await processingTaskAxios(param);
        if(res.status===200){
          if(res.data.status){
            dispatch(saveOverTimeTask(res.data.data));
          }else{
            dispatch(saveOverTimeTask([]));
          }
        }else{
          dispatch(saveOverTimeTask([]));
        }
      }
    }

  // 获取已完成任务列表(待领取drawState:'0' ; 已完成 drawState:'1')
  export function finishTask(payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await pendingTaskAxios(payload);
      if(res.status===200){
        if(res.data.status){
          dispatch(saveFinishTask(res.data.data));
        }else{
          dispatch(saveFinishTask([]))
        }
      }else{
        dispatch(saveFinishTask([]))
      }
    }
  }

  // 领取任务
  export function getTask(workItemInstID, nodeInstanceID, payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await getTaskAxios(workItemInstID, nodeInstanceID);
      if(res.status===200){
        if(res.data.status){
          // 领取成功
          Toast.success('领取成功', 1.2);
          // 领取成功后刷新待领取任务列表
          if(!_.isEmpty(payload)){
            const res = await pendingTaskAxios(payload);
            if(res.status===200){
              if(res.data.status){
                // console.log('待处理列表成功')
                // console.log(res.data.data)
                dispatch(savePendingTask(res.data.data));
                setTimeout(() => {
                }, 200);
              }else{
                dispatch(savePendingTask([]))
                setTimeout(() => {
                }, 200);
              }
            }else{
              dispatch(savePendingTask([]))
              setTimeout(() => {
              }, 200);
            }
          }
        }else{
          // 领取失败
          Toast.info('领取失败', 1.2)
        }
      }else{
        // 领取失败
        Toast.info('领取失败', 1.2)
      }
    }
  }

  // 领取任务(在点位列表页面领取)
  export function getTaskInDetail(workItemInstID, nodeInstanceID, payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await getTaskAxios(workItemInstID, nodeInstanceID);
      if(res.status===200){
        if(res.data.status){
          // 领取成功
          Toast.success('领取成功', 1.2);
          // 领取成功后刷新待领取任务列表并返回上一页面
          if(!_.isEmpty(payload)){
            const res = await pendingTaskAxios(payload);
            if(res.status===200){
              if(res.data.status){
                // console.log('待处理列表成功')
                // console.log(res.data.data)
                dispatch(savePendingTask(res.data.data));
                setTimeout(() => {
                  handleBack();
                }, 200);
              }else{
                dispatch(savePendingTask([]))
                setTimeout(() => {
                  handleBack();
                }, 200);
              }
            }else{
              dispatch(savePendingTask([]))
              setTimeout(() => {
                handleBack();
              }, 200);
            }
          }
        }else{
          // 领取失败
          Toast.info('领取失败', 1.2)
        }
      }else{
        // 领取失败
        Toast.info('领取失败', 1.2)
      }
    }
  }

  // 退回任务  
  export function returnTask(workItemInstID, nodeInstanceID, payload){
    // eslint-disable-next-line no-unused-vars
    return async dispatch=>{
      const res = await returnTaskAxios(workItemInstID, nodeInstanceID);
      if(res.status===200){
        if(res.data.status){
          // 退回成功
          Toast.success('退回成功', 1.2)
          // 领取成功后刷新待执行任务列表
          const res = await processingTaskAxios(payload);
          if(res.status===200){
            if(res.data.status){
              // console.log('待处理列表成功')
              // console.log(res.data.data)
              dispatch(saveProcessingTask(res.data.data));
            }else{
              dispatch(saveProcessingTask([]))
            }
          }else{
            dispatch(saveProcessingTask([]))
          }
        }else{
          // 领取失败
          Toast.info('退回失败', 1.2)
        }
      }else{
        // 领取失败
        Toast.info('退回失败', 1.2)
      }
    }
  }

  // 获取待执行,待领取任务点位列表
  export function pointList(payload){
    return async dispatch=>{
      const res = await pointListAxios(payload);
      if(res.status===200){
        if(res.data.status){

          // dispatch(savePointList(newList));
          dispatch(savePointList(res.data.data.list));
          
        }else{
          dispatch(savePointList([]));
        }
      }else{
        dispatch(savePointList([]));
      }
    }
  }

  // 获取网格所有父节点信息
  export function getGridList(payload, index){
    // console.log('getGridList')
    return async dispatch=>{
      const res = await fetchGridAxios({id:payload, token:localStorage.getItem('token')});
      if(res.status===200){
        if(res.data.status){
          dispatch(saveGridList({id:payload, index:index, list:res.data.data}));
        }else{
          dispatch(saveGridList({id:payload, index:index, list:['-']}));
        }
      }else{
        dispatch(saveGridList({id:payload, index:index, list:['-']}));
      }
    }
  }

  // 清除网格信息
  export function clearGridList(){
    console.log('clear')
    return async dispatch=>{
      dispatch(saveGridList([]));
    }
  }

  // 获取(事件上报, 设备报修)点位详情
  export function pointListReport(payload){
    return async dispatch=>{
      const res = await pointListReportAxios(payload);
      if(res.status===200){
        if(res.data.status){
          dispatch(dviceInfo(res.data.data));
        }else{
          dispatch(dviceInfo({}));
        }
      }else{
        dispatch(dviceInfo({}));
      }
    }
  }

  // 获取待执行任务点位设备列表 
  export function pointDeviceList(payload){
    const param = payload
    return async dispatch=>{
      const res = await pointDeviceListAxios(param);
      if(res.status===200){
        if(res.data.status){
          dispatch(savePointDeviceList(res.data.data));
        }else{
          dispatch(savePointDeviceList([]));
        }
      }else{
        dispatch(savePointDeviceList([]));
      }
    }
  }

  // 清除待执行任务点位设备列表 
  export function clearPointDeviceList(){
    return async dispatch=>{
      dispatch(savePointDeviceList([]));
    }
  }

  // 手动添加待领取任务
  export function addTask(payload){
    return async dispatch=>{
      const res = await addTaskAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('添加成功', 1.2)
        }else{
          Toast.info('添加失败false', 1.2)
        }
      }else{
        Toast.info('添加失败200', 1.2)
      }
    }
  }


  // 执行巡检任务
  export function doSBXJ(payload, type){
    return async dispatch=>{
      const res = await doSBXJAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('执行成功', 1.2);
          handleBack();
          if(type==='1'){
            handleBack();
          }
        }else{
          Toast.info('执行失败', 1.2)
        }
      }else{
        Toast.info('执行失败', 1.2)
      }
    }
  }

  // 执行设备保养任务
  export function doSBBY(payload, type){
    return async dispatch=>{
      const res = await doSBBYAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('执行成功', 1.2);
          handleBack();
          if(type==='1'){
            handleBack();
          }
        }else{
          Toast.info('执行失败', 1.2)
        }
      }else{
        Toast.info('执行失败', 1.2)
      }
    }
  }

  // 执行设备运行任务
  export function doSBYX(payload, type){
    return async dispatch=>{
      const res = await doSBYXAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('执行成功', 1.2);
          handleBack();
          if(type==='1'){
            handleBack();
          }
        }else{
          Toast.info('执行失败', 1.2)
        }
      }else{
        Toast.info('执行失败', 1.2)
      }
    }
  }


  // 保存巡检任务
  export function saveSBXJ(payload){
    return async dispatch=>{
      const res = await saveSBXJAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('保存成功', 1.2);
          handleBack();
        }else{
          Toast.info('保存失败', 1.2)
        }
      }else{
        Toast.info('保存失败', 1.2)
      }
    }
  }

  // 保存设备保养任务
  export function saveSBBY(payload){
    return async dispatch=>{
      const res = await saveSBBYAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('保存成功', 1.2);
          handleBack();
        }else{
          Toast.info('保存失败', 1.2);
        }
      }else{
        Toast.info('保存失败', 1.2);
      }
    }
  }

  // 保存设备运行任务
  export function saveSBYX(payload){
    return async dispatch=>{
      const res = await saveSBYXAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('保存成功', 1.2);
          handleBack();
        }else{
          Toast.info('保存失败', 1.2);
        }
      }else{
        Toast.info('保存失败', 1.2);
      }
    }
  }

  // 获取网格树
  export function getGridTree(preID){
    const payload={
      token:JSON.parse(localStorage.getItem('token')),
      preID:preID
    }
    return async dispatch=>{
      const res = await getGridTreeAxios(payload);
      if(res.status===200){
        if(res.data.status){
          dispatch(saveGridTree(res.data.data));
        }else{
          dispatch(saveGridTree([]));
        }
      }else{
        dispatch(saveGridTree([]));
      }
    }
  }

  // 异常上报(设备报修)提交
  export function exceptionSubmit(payload){
    return async dispatch=>{
      const res = await exceptionSubmitAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('提交成功', 1.2)
          // 保存提交状态(将会跳转页面,返回任务列表)
            dispatch(saveExceptionSubmitStatus(true));
        }else{
          Toast.info('提交失败 : ' + res.data.message, 1.2)
        }
      }else{
        Toast.info('提交失败', 1.2)
      }
    }
  }

  // 事件上报 提交 
  export function reportSubmit(payload){
    return async dispatch=>{
      const res = await reportSubmitAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('提交成功', 1.2)
          // 保存提交状态(将会跳转页面,返回任务列表)
          handleBack();
        }else{
          Toast.info('提交失败 : ' + res.data.message, 1.2)
        }
      }else{
        Toast.info('提交失败', 1.2)
      }
    }
  }

  // 执行事件上报 提交 
  export function doSJSB(payload){
    return async dispatch=>{
      const res = await doSJSBAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('提交成功', 1.2)
          // 保存提交状态(将会跳转页面,返回任务列表)
          setTimeout(() => {
            handleBack();
          }, 500);
        }else{
          Toast.info('提交失败 : ' + res.data.message, 1.2)
        }
      }else{
        Toast.info('提交失败', 1.2)
      }
    }
  }

  // 执行设备报修 提交 scanPointAxios
  export function doSBBX(payload){
    return async dispatch=>{
      const res = await doSBBXAxios(payload);
      if(res.status===200){
        if(res.data.status){
          Toast.success('提交成功', 1.2)
          // 保存提交状态(将会跳转页面,返回任务列表)
          setTimeout(() => {
            handleBack();
          }, 500);
        }else{
          Toast.info('提交失败 : ' + res.data.message, 1.2)
        }
      }else{
        Toast.info('提交失败', 1.2)
      }
    }
  }

  // 扫描设备二维码
  export function scanDevice(payload){
    return async dispatch=>{
      const res = await scanDeviceAxios({qrCodeId:payload.qrCodeId});
      if(res.status===200){
        if(res.data.status){
          // Toast.success('扫描成功', 1.2)
          dispatch(dviceInfo(res.data.data));
          payload.props.history.push('/librarydeviceinfo')
        }else{
          Toast.info(res.data.message, 1.4);
          setTimeout(() => {
            handleBack();
          }, 1500);
        }
      }else{
        Toast.info('请检查网络', 1.2);
      }
    }
  }

  
  // 扫描点位二维码
  export function scanPoint(payload){
    const pointPayload = {
        "pointId": payload.pointID,
        "qrCodeId": payload.qrCodeId
    }
    return async dispatch=>{
      const res = await scanPointAxios(pointPayload);
      if(res.status===200){
        if(res.data.status){
          // lineID, pointID, missionId, workInsId, serviceType, gridID
          payload.props.history.push(`/pointdetail/${payload.lineID}/${payload.pointID}/${payload.missionId}/${payload.workInsId}/${payload.serviceType}/${payload.gridID}/`)
        }else{
          Toast.info(res.data.message, 1.4);
        }
      }else{
        Toast.info('请检查网络', 1.2);
      }
    }
  }