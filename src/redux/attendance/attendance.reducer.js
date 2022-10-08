
import { IS_IN_AREA, SIGN_INFO, SIGN_IN_LIST
} from '@/constants';
import _ from 'lodash';
// 初始状态
const initState={
  isInArea: false,
  signInfo: [],
  signInList: {},
}
// reducer
export function attendance(state=initState, action){
  switch(action.type){
    case IS_IN_AREA:
      return {...state,isInArea:action.payload}
    case SIGN_INFO:
      return {...state,signInfo:action.payload}
    case SIGN_IN_LIST:
      return {...state,signInList:action.payload}
    default:
      return state
  }
}
