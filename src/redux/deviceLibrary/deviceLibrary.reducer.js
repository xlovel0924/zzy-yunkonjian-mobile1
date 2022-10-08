
import { ALL_DEVICE_TYPE, DEVICE_LIST
} from '@/constants';
import _ from 'lodash';
// 初始状态
const initState={
  allDeviceType:[],
  deviceList:[],
}
// reducer
export function deviceLibrary(state=initState, action){
  switch(action.type){
    case ALL_DEVICE_TYPE:
      return {...state,allDeviceType:action.payload}
    case DEVICE_LIST:
      return {...state,deviceList:action.payload}
    default:
      return state
  }
}
