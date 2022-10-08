// 合并所有的reducer 并且返回
import {combineReducers} from 'redux';
import { user } from '@/redux/user/user.reducer';
import { ship } from '@/redux/ship/ship.reducer';
import { alarm } from '@/redux/alarm/alarm.reducer';
import { fishing } from '@/redux/fishingArea/fishingArea.reducer';
import { seaArea } from '@/redux/seaArea/seaArea.reducer';
import { task } from '@/redux/task/task.reducer';
import { deviceLibrary } from '@/redux/deviceLibrary/deviceLibrary.reducer';
import { notice } from '@/redux/notice/notice.reducer';
import { attendance } from '@/redux/attendance/attendance.reducer';
import { diyMuBei } from '@/redux/diyMuBei/diyMuBei.reducer';
import { familyReducer } from "@/redux/family/family.reducer"
import { indexReducer } from "@/redux/index/index.reducer";
import { mailReducer } from "@/redux/spaceTimeMail/spaceTimeMail.reducer";

const reducers = combineReducers({
  user,
  ship,
  alarm,
  fishing,
  seaArea,
  task,
  deviceLibrary,
  notice,
  attendance,
  diyMuBei,
  familyReducer,
  indexReducer,
  mailReducer
});
export default reducers;