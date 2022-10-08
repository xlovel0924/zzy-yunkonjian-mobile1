import { Toast } from 'antd-mobile';
import _ from 'lodash';
import { MUBEILIST, TEXTLIST, TREELIST, ITEMSLIST, PHOTOLIST, ERROR_MSG, TAOCAN, MYDIYLIST } from '@/constants';
import { fetchMuBeiAxios, fetchMyDiyListAxios, fetchTaoCanListAxios, deleteMyDiyAxios, saveMyDiyAxios, fetchAllCompnyTaoCanListAxios } from '@/server/diyMuBei.js';



// 错误信息提示
function errorMsg(message){
  Toast.fail(message, 1);
  return {message, type:ERROR_MSG}
}

// 成功信息提示
function successMsg(message){
  Toast.success(message, 1);
  return {message, type:ERROR_MSG}
}

// 请求成功，但返回空数据时提示信息
function emptyData(msg){
  Toast.fail(msg, 1);
}

// 保存各类商品信息
function saveProductList(data,type){
  if(type==='墓碑'){
    return { type:MUBEILIST, payload:data}
  }else if(type==='小树'){
    return { type:TREELIST, payload:data}
  }else if(type==='文字'){
    return { type:TEXTLIST, payload:data}
  }else if(type==='小品'){
    return { type:ITEMSLIST, payload:data}
  }else if(type==='相框'){
    return { type:PHOTOLIST, payload:data}
  }else if(type==='套餐'){
    return { type:TAOCAN, payload:data}
  }else if(type==='我的方案'){
    return { type:MYDIYLIST, payload:data}
  }
}


// function clearCameraListSuccess(data){
//   return { type:CAMERA_LIST, payload:data}
// }

// 清除摄像机信息
// export function clearCameraList(){
//   return async dispatch=>{
//     dispatch(clearCameraListSuccess({}))
//   }
// }

// 根据商品类目获取商品列表
export function fetchProductList(params){
  // let token = JSON.parse(localStorage.getItem('token'));
  var param = {productTypeName: params.typeName};
  return async dispatch=>{
    const res = await fetchMuBeiAxios(param);
    if(res.status===200){
      if(res.data.flag){
        if(!_.isEmpty(res.data.data)){
          dispatch(saveProductList(res.data.data, params.typeName))
        }else{
          dispatch(saveProductList([], params.typeName))
        }
      }else{
        dispatch(errorMsg(res.data.message))
      }
    }else{
      // dispatch(errorMsg(res.statusText))
    }
  }
}

// 搜索公司全部套餐
export function fetchTaoCanList(){
  return async dispatch=>{
    const res = await fetchAllCompnyTaoCanListAxios();
    // console.log('-----------------------')
    // console.log(res) 
    if(res.data.status===200){
      if(res.data.flag){
          dispatch(saveProductList(res.data.data, '套餐'))
      }else{
        dispatch(errorMsg(res.data.message))
      }
    }else{
      // dispatch(errorMsg(res.statusText))
    }
  }
}

// 请求获取我的方案列表
export function fetchMyDiyList(){
  // let token = JSON.parse(localStorage.getItem('token'));
  let token = '';
  var param = {personnelId: JSON.parse(sessionStorage.getItem('userid'))};
  return async dispatch=>{
    const res = await fetchMyDiyListAxios(param);
    if(res.data.status===200){
      if(res.data.flag){
        dispatch(saveProductList(res.data.data, '我的方案'))
      }else{
        dispatch(errorMsg(res.data.message))
      }
    }else{
      // dispatch(errorMsg(res.statusText))
    }
  }
}


// 删除自定义方案
export function deleteMyDiy(params){
  return async dispatch=>{
    const res = await deleteMyDiyAxios(params);
    if(res.status===200){
      if(res.data.status){
        dispatch(successMsg('删除成功'))
      }else{
        dispatch(errorMsg(res.data.message))
      }
    }else{
    }
  }
}


// 保存diy方案
export function saveMyDiy(params){
  return async dispatch=>{
    const res = await saveMyDiyAxios(params);
    if(res.status===200){
      if(res.data.status){
        dispatch(successMsg('保存成功'))
      }else{
        dispatch(errorMsg(res.data.message))
      }
    }else{
      // dispatch(errorMsg(res.statusText))
    }
  }
}


