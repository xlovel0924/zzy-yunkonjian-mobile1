import { CAMERA_LIST } from '@/constants';

// εε§ηΆζ
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
