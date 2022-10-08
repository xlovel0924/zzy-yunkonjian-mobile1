import { Toast } from 'antd-mobile';
// import _ from 'lodash';
import { AIS_HISTORY, ERROR_MSG,SELECT_SHIP, HIDE_SHIPS, AIS_LIST, ARPA_LIST, TEST} from '@/constants';
import { findAisHistoryAxios, findAisListAxios, testAxios, findArpaHistoryAxios, findHistory24hAxios, testRadarAxios
  //  findArpaListAxios 
  } from '@/server/homePage';


function aisHistory(data){
  return  { type:AIS_HISTORY, payload:data}
}

function saveTest(data){
  return { type:TEST, payload:data }
}


// 清除ais缓存
function clearAisHistorySave(data){
  return  { type:AIS_HISTORY, payload:data}
}

// 保存选择的船舶信息
function saveSelectShip(data){
  return  { type:SELECT_SHIP, payload:data}
}

// 显示历史轨迹时隐藏其他船
function hideOtherShips(data){
  return  { type:HIDE_SHIPS, payload:data}
}

// 保存aisList
function saveAisList(data){
  return  { type:AIS_LIST, payload:data}
}

// 保存arpaList
function saveArpaList(data){
  return  { type:ARPA_LIST, payload:data}
}

function clearAisListSuccess(data){
  return  { type:AIS_LIST, payload:data}
}

function clearArpaListSuccess(data){
  return  { type:ARPA_LIST, payload:data}
}

// 错误信息提示
function errorMsg(message){
  Toast.info(message, 1);
  return {message, type:ERROR_MSG}
}



// 清除Ais历史轨迹
export function clearAisHistory(){
  return async dispatch=>{
    dispatch(clearAisHistorySave([]))
  }
}

// 保存选中的船id
export function saveSelectShipId(id,type){
  const data = {id:id,type:type}
  return async dispatch=>{
    dispatch(saveSelectShip(data))
  }
}

// 清除选中的船
export function clearSelectShipId(){
  return async dispatch=>{
    dispatch(saveSelectShip({}))
  }
}


// 查询24小时前ais,arpa船历史轨迹
export function findHistory24h(id){
 const param = {id:id}
  return async dispatch=>{
    const res = await findHistory24hAxios(param);
    if(res.status===200){
      if(res.data.status){
        if(res.data.data.length===0){
          errorMsg('无轨迹数据')
          dispatch(hideOtherShips(false))
        }else{
          dispatch(aisHistory(res.data.data))
          // 如果请求成功隐藏其他船
          dispatch(hideOtherShips(true))
        }
      }else{
        errorMsg(res.data.message)
        dispatch(hideOtherShips(false))
      }
    }else{
      errorMsg(res.statusText)
      dispatch(hideOtherShips(false))
    }
  }
}
// 查询ais船历史轨迹
export function findAisHistory(mmsi, startTime, endTime, modalType){
  if(!mmsi){
    return errorMsg('mmsi不能为空');
  }
  let token = JSON.parse(localStorage.getItem('token'));
  var param = {token, id:mmsi, startTime, endTime};
  return async dispatch=>{
    let res ;
    if(modalType==='aisShip' || modalType==='alarmAisShip'){
      res = await findAisHistoryAxios(param);
    }else{
      res = await findArpaHistoryAxios(param);
    }
    if(res.status===200){
      if(res.data.status){
        if(res.data.data.length===0){
          errorMsg('无轨迹数据')
          dispatch(hideOtherShips(false))
        }else{
          dispatch(aisHistory(res.data.data))
          // 如果请求成功隐藏其他船
          dispatch(hideOtherShips(true))
        }
      }else{
        errorMsg(res.data.message)
        dispatch(hideOtherShips(false))
      }
    }else{
      errorMsg(res.statusText)
      dispatch(hideOtherShips(false))
    }
  }
}

// 显示其他船
export function showOtherShips(){
  return async dispatch=>{
    dispatch(hideOtherShips(false))
  }
}

// 查询aisList/arpaList数据
export function findAisList(lonLat){
  const token = JSON.parse(localStorage.getItem('token'))
  const latitude = JSON.parse(sessionStorage.getItem('backCenter_center'))[0]
  const longitude = JSON.parse(sessionStorage.getItem('backCenter_center'))[1]
  const param = {token,latitude,longitude,nmi:5,lonLat:lonLat}
  return async dispatch=>{
    const res = await findAisListAxios(param);
    if(res.status===200){
      if(res.data.status){
        dispatch(saveAisList(res.data.data[0].data))
        dispatch(saveArpaList(res.data.data[1].data))
      }else{
        
      errorMsg(res.data.message)
      }
    }else{
      errorMsg(res.message)
      dispatch(hideOtherShips(false))
    }
  }
}

// // 请求arpa模拟数据
// export function findArpaList(){
//   let tempArpaList =[{sog:parseInt(Math.random()*30),cog:121,arpaId:`110`,
//     latitude:39.2695,longitude:122.79,time:'2019-10-16 00:00:00'}]
//   return async dispatch=>{
//     dispatch(saveArpaList(tempArpaList))
//   }
// }

// 查询arpaList数据
// export function findArpaList(){
//   const token = JSON.parse(sessionStorage.getItem('token'))
//   const latitude = JSON.parse(sessionStorage.getItem('backCenter_center'))[0]
//   const longitude = JSON.parse(sessionStorage.getItem('backCenter_center'))[1]
//   const param = {token,latitude,longitude,nmi:30}
//   return async dispatch=>{
//     const res = await findArpaListAxios(param);
//     if(res.status===200){
//       if(res.data.status){
//         dispatch(saveArpaList(res.data.data[0].data))
//       }else{
        
//       errorMsg(res.data.message)
//       }
//     }else{
//       errorMsg(res.message)
//       dispatch(hideOtherShips(false))
//     }
//   }
// }


// 报警测试接口
export function test(seq){
  const param = {seq}
  return async dispatch=>{
    const res = await testAxios(param);
    if(res.status===200){
      if(res.data.status){
        dispatch(saveTest(res.data.data))
      }else{
      errorMsg(res.data.message)
      }
    }else{
      errorMsg(res.data.message)
    }
  }
}

// 雷达报警测试接口
export function testRadar(seq){
  const param = {seq}
  return async dispatch=>{
    const res = await testRadarAxios(param);
    if(res.status===200){
      if(res.data.status){
        dispatch(saveTest(res.data.data))
      }else{
      errorMsg(res.data.message)
      }
    }else{
      errorMsg(res.data.message)
    }
  }
}

// 清除ais信息
export function clearAisList(){
  return async dispatch=>{
    dispatch(clearAisListSuccess([]))
  }
}

// 清除ais信息
export function clearArpaList(){
  return async dispatch=>{
    dispatch(clearArpaListSuccess([]))
  }
}