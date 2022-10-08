// import qs from 'qs';
import axios from 'axios';
import { smallOwnersUrl } from './service';


  // 获取待领取,已完成事件列表
  export function pendingTaskAxios(data){
    return axios.post(smallOwnersUrl('eo_service/QueryWIFARes'),data);
  }

  // 获取进行中事件列表
  export function processingTaskAxios(data){
    return axios.post(smallOwnersUrl('eo_service/QueryWIRes'),data);
  }


  // 领取任务
  export function getTaskAxios(workItemInstID, nodeInstanceID){
    return axios.get(smallOwnersUrl(`eo_service/GetWIRes?workItemInstID=${workItemInstID}&nodeInstanceID=${nodeInstanceID}`));
  }


   // 退回任务
   export function returnTaskAxios(workItemInstID, nodeInstanceID){
    return axios.get(smallOwnersUrl(`eo_service/ReturnWIRes?workItemInstID=${workItemInstID}&nodeInstanceID=${nodeInstanceID}`));
  }

  // 获取待执行任务点位列表
  export function pointListAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/App_getWorkPoint'),data);
  }

  // 获取待执行任务点位列表 (事件上报,设备报修)
  export function pointListReportAxios(data){
    return axios.post(smallOwnersUrl('T_EmergentMissionInst/detailsMission_SBBX_details'),data);
  }
    
  // 获取待执行任务点位设备列表 
  export function pointDeviceListAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/App_getPointDevice'),data);
  }

  // 手动添加任务 http://localhost:8085/system/T_CommonMissionInst/generateMission_SBXJ   POST参数{"t_CommonPlanInfo":{"id":"2007137PFTK2BRS8"}}
  export function addTaskAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/generateMission_SBXJ'),data);
  }

  // 执行设备巡检任务 
  export function doSBXJAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/do_service_SBXJ'),data);
  }

  // 执行设备保养任务 
  export function doSBBYAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/do_service_SBBY'),data);
  }

  // 执行设备运行任务 
  export function doSBYXAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/do_service_SBYX'),data);
  }

  // 执行设备巡检任务 
  export function saveSBXJAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/save_service_SBXJ'),data);
  }

  // 执行设备保养任务 
  export function saveSBBYAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/save_service_SBBY'),data);
  }

  // 执行设备运行任务 
  export function saveSBYXAxios(data){
    return axios.post(smallOwnersUrl('T_CommonMissionInst/save_service_SBYX'),data);
  }

  // 获取网格树
  export function getGridTreeAxios(data){
    return axios.post(smallOwnersUrl('gridInfo/findAllByPreID'),data);
  }

  // 异常上报提交
  export function exceptionSubmitAxios(data){
    return axios.post(smallOwnersUrl('T_EmergentMissionInst/createMission_SBBX'),data);
  }

  // 事件上报提交
  export function reportSubmitAxios(data){
    return axios.post(smallOwnersUrl('T_EmergentMissionInst/createMission_SJSB'),data);
  }

  // 执行事件上报
  export function doSJSBAxios(data){
    return axios.post(smallOwnersUrl('T_EmergentMissionInst/APP_DoMission_SJSB_ZX'),data);
  }

  // 执行设备报修
  export function doSBBXAxios(data){
    return axios.post(smallOwnersUrl('T_EmergentMissionInst/APP_DoMission_SBBX_ZX'),data);
  }

  // 获取中文网格信息
  export function fetchGridAxios(data){
    return axios.post(smallOwnersUrl('gridInfo/app_selectParentInfoBySelf'),data);
  }

  // 扫描点位二维码
  export function scanPointAxios(data){
    return axios.post(smallOwnersUrl('app/appPointQrCode'),data);
  }

  // 扫描设备二维码
  export function scanDeviceAxios(data){
    return axios.post(smallOwnersUrl('app/appDeviceQrCode'),data);
  }