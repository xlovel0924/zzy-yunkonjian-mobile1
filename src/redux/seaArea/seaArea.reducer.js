import { CAMERA_LIST } from '@/constants';

// 初始状态
const initState={
  cameraList:[]
}
// reducer
export function seaArea(state=initState, action){
  switch(action.type){
    case CAMERA_LIST:
        return {...state,cameraList:action.payload}
    default:
        return state
  }
}
