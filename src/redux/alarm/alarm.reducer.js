
import { ALARM_PENDING_LIST, ALARM_FINISH_LIST,ALARM_Viewdetails_LIST} from '@/constants';
// 初始状态
const initState={
  alarmPendinglist: [],
  alarmFinishlist: [],
  Viewdetails:{},
}
// reducer
export function alarm(state=initState, action){
  switch(action.type){
    case ALARM_PENDING_LIST:
        return {...state,alarmPendinglist:action.payload}
    case ALARM_FINISH_LIST:
        return {...state,alarmFinishlist:action.payload}
        case ALARM_Viewdetails_LIST:
          return {...state,Viewdetails:action.payload}
    default:
        return state
  }
}
