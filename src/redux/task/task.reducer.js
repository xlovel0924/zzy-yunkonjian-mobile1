
import { PENDING_TASK_LIST, PROCESSING_TASK_LIST, POINT_LIST, POINT_DEVICE_LIST, DEVICE_INFO, FINISH_TASK_LIST, EXCEPTION_SUBMIT_STATUS,
  GRID_TREE, WILL_PAYLOAD, GRID_LIST, OVERTIME_TASK_LIST,ALL_ROUTE
} from '@/constants';
import _ from 'lodash';
// 初始状态
const initState={
  pendingTaskList: [],
  processingTaskList: [],
  overTimeTaskList: [],
  finishTaskList: [],
  pointList: [],
  pointDeviceList: [],
  deviceInfo: {},
  gridTree: [],
  exceptionSubmitStatus: false,         // 异常上报提交状态 
  willPayload: {},
  gridList: [],
}
// reducer
export function task(state=initState, action){
  switch(action.type){
    case PENDING_TASK_LIST:
      return {...state,pendingTaskList:action.payload}
    case PROCESSING_TASK_LIST:
      return {...state,processingTaskList:action.payload}
    case OVERTIME_TASK_LIST:
      return {...state,overTimeTaskList:action.payload}
    case FINISH_TASK_LIST:
      return {...state,finishTaskList:action.payload}
    case POINT_LIST:
      return {...state,pointList:action.payload}
    case POINT_DEVICE_LIST:
      return {...state,pointDeviceList:action.payload}
    case DEVICE_INFO:
      return {...state,deviceInfo:action.payload}
    case EXCEPTION_SUBMIT_STATUS:
      return {...state,exceptionSubmitStatus:action.payload}
    case GRID_TREE:
      return {...state,gridTree:action.payload}
    case WILL_PAYLOAD:
      return {...state,willPayload:action.payload}
    case GRID_LIST:
      const { gridList } = state;
      let tempGridList = gridList;
      if(action.payload.length===0){
        tempGridList=[]
        return {...state,gridList:[]}
      }else{
        if(!_.isEmpty(gridList)){
          let isInArray = false
          gridList.map(e=>{
            if(e.id === action.payload.id && e.index === action.payload.index){
              isInArray = true
            }
          })
          if(!isInArray){
            tempGridList.push(action.payload)
          }
        }else{
          tempGridList.push(action.payload)
        }
        return {...state,gridList:tempGridList}
      }
    default:
      return state
  }
}
