import { ALARM_PENDING_LIST, ALARM_FINISH_LIST,ALARM_Viewdetails_LIST} from '@/constants';
import { alarmPendingListAxiosMock,alarmReleaseAxiosMock, alarmFinishAxiosMock, alarmviewAxiosMock} from '@/server/alarm';

function alarmPendingList(data){
    return { type:ALARM_PENDING_LIST, payload:data}
  }
  
  function alarmFinishList(data){
    return { type:ALARM_FINISH_LIST, payload:data}
  }
  function alarmviewFinishList(data){
    return { type:ALARM_Viewdetails_LIST, payload:data}
  }
  // 获取报警待处理列表列表
  export function alarmPendingListMock(){
    let token = JSON.parse(localStorage.getItem('token'));
    // eslint-disable-next-line no-unused-vars
    let user = localStorage.getItem('user');
    user = JSON.parse(user)
    var param = {token:token, status:"1"};
    return async dispatch=>{
      const res = await alarmPendingListAxiosMock(param);
      if(res.status===200){
        if(res.data.status){
          // console.log('待处理列表成功')
          // console.log(res.data.data)
          dispatch(alarmPendingList(res.data.data));
        }else{
          dispatch(alarmPendingList([]))
        }
      }else{
        dispatch(alarmPendingList([]))
      }
    }
  }
  //报警详情
  export function alarmPendingviewListMock(dataid){
    let token = JSON.parse(localStorage.getItem('token'));
    // eslint-disable-next-line no-unused-vars
    let user = localStorage.getItem('user');
    user = JSON.parse(user)
    var param = {token:token, id:dataid};
    return async dispatch=>{
      const res = await alarmviewAxiosMock(param);
      if(res.status===200){
        if(res.data.status){
          dispatch(alarmviewFinishList(res.data.data));
        }else{
          dispatch(alarmviewFinishList({}));
        }
      }else{
        dispatch(alarmviewFinishList({}));
      }
    }
  }
  // 获取报警已完成列表列表
  export function alarmFinishListMock(){
    let token = JSON.parse(localStorage.getItem('token'));
    // let user = localStorage.getItem('user');
    // user = JSON.parse(user)
    var param = { token, status:"2" };
    return async dispatch=>{
      const res = await alarmFinishAxiosMock(param);
      if(res.status===200){
        if(res.data.status){
          dispatch(alarmFinishList(res.data.data));
        }else{
          dispatch(alarmFinishList([]));
        }
      }else{
        dispatch(alarmFinishList([]));
      }
    }
  }
  // 解除报警
export function alarmRelease(id,remark){
  let token = JSON.parse(localStorage.getItem('token'));
  // let user = JSON.parse(localStorage.getItem('user'));
  var param = {token,id,remark};
  return async ()=>{
    const res = await alarmReleaseAxiosMock(param);
    if(res.status===200){
        //  console.log('解除报警成功')
    }
  }
}