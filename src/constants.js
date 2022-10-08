// 家谱信息列表
import {queryGenealogyMemberAxios} from "./server/family";

export const FAMILY_LIST = "FAMILY_LIST";
// 根据用户查家庭
export const FAMILY = "FAMILY";
// 根据条件查家谱（家谱列表）
export const CONDITION_FAMILY_LIST = "CONDITION_FAMILY_LIST";
// 关注的家谱
export const CONCER_FAMILY_LIST = "CONCER_FAMILY_LIST";
// 创建家谱
export const CREATE_FAMILY = "CREATE_FAMILY"
// 修改家谱
export const EDIT_FAMILY_LIST = "EDIT_FAMILY_LIST"
// 成功信息提示
export const SUCCESS_MSG = "SUCCESS_MSG";
// 家谱世代信息
export const QUERY_GENEALOGY_MEMBER = "QUERY_GENEALOGY_MEMBER";
// 添加家谱
export const ADD_MEMBER = "ADD_MEMBER";
// 家谱世代
export const MEMBER_LIST = "MEMBER_LIST";
// 根据用户查家谱
export const FAMILY_LIST_BY_MEMBER_ID = "FAMILY_LIST_BY_MEMBER_ID";
// 登录是否显示
export const LOGIN_ISSHOW = "LOGIN_ISSHOW"
// 根据父亲查儿子的集合
export const SON_LIST = "SON_LIST"
// 城市和图片集合
export const CITY_PIC_LIST = "CITY_PIC_LIST"
// 当前城市
export const CURRENT_CITY = "CURRENT_CITY";
// 所有链接
export const ALL_ROUTE = "ALL_ROUTE";
// 根据父亲查询妻子集合
export const WIFE_LIST = "WIFE_LIST"
// 根据id查询个人信息
export const MEMBER_INFO = "MEMBER_INFO"
// 根据家谱id查询关注人信息
export const CONCERN_INFO = "CONCERN_INFO"
// 许愿祈福列表
export const BLESSINGS = "BLESSINGS"
// 香类型列表
export const INSENSETYPE = 'INSENSETYPE'
// 所有香炉列表
export const ALLINCENSEBURNER = 'ALLINCENSEBURNER'
// 上香状态
export const INSENSELIST = 'INSENSELIST'
// 添加姓名时选择人信息
export const SELECT_PEOPLE_INFO = "SELECT_PEOPLE_INFO"
// 备份添加数据
export const COPY_DATA_INFO = "COPY_DATA_INFO"
// 选择头像
export const SELECT_AVATAR = "SELECT_AVATAR"
// 文本验证结果
export const TEXT_REVIEW = "TEXT_REVIEW"



//详情列表
export const ALARM_Viewdetails_LIST = 'ALARM_Viewdetails_LIST';
// 加载数据
export const LOAD_DATA = 'LOAD_DATA';
// 用户列表
export const USERS_LIST = 'USERS_LIST';
// 用户数据加载成功
export const USER_SUCCESS='USER_SUCCESS';
//报警待处理列表
export const ALARM_PENDING_LIST = 'ALARM_PENDING_LIST';
//作业待处理列表
export const WORK_PENDING_LIST = 'WORK_PENDING_LIST';
//作业处理中列表
export const WORK_WORKING_LIST = 'WORK_WORKING_LIST';
//作业处理完成列表
export const WORK_FINISH_LIST = 'WORK_FINISH_LIST';
// 登出
export const LOGOUT = 'LOGOUT';
// 错误信息
export const ERROR_MSG = 'ERROR_MSG';
// 设备列表
export const DEVICE_SUCCESS = 'DEVICE_SUCCESS';
// 土壤信息
export const SOIL_SUCCESS = 'SOIL_SUCCESS';
// 消息列表
export const NEW_LIST = 'NEW_LIST';
// 报警消息列表
export const ALARM_NEW_LIST = 'ALARM_NEW_LIST';
// 报警结果
export const ALARM_FINISH_LIST = 'ALARM_FINISH_LIST';
// 作业消息列表
export const WORK_NEW_LIST = 'WORK_NEW_LIST';
// 系统消息列表
export const SYSTEM_NEW_LIST = 'SYSTEM_NEW_LIST';
// 地图设备点位
export const DEVICES_LIST = 'DEVICES_LIST';

// AIS静态数据
export const AIS_STATIC_INFO = 'AIS_STATIC_INFO';
//AIS动态数据
export const AIS_DYNA_INFO = 'AIS_DYNA_INFO';
// AIS 历史数据
export const AIS_HISTORY = 'AIS_HISTORY';
// 地图ARPA历史轨迹
export const ARPA_HISTORY = 'ARPA_HISTORY';
// 清除
export const ARPA_CLEAR_HISTORY = 'ARPA_CLEAR_HISTORY';
// 图
export const ARPA_IMG = 'ARPA_IMG';
// 地图标绘点位坐标
export const DRAW_LIST = 'DRAW_LIST';
// 船舶列表
export const SHIPS_LIST = 'SHIPS_LIST';
// 船舶详情
export const SHIP_INFO = 'SHIP_INFO';
// 物资列表
export const MATERIALS_LIST = 'MATERIALS_LIST';
// 作业地点列表
export const LOCATIONS_LIST = 'LOCATIONS_LIST';
// 地图Ais船详情
export const AIS_INFO = 'AIS_INFO';
// 地图设备详情
export const DEVICES_INFO = 'DEVICES_INFO';
// 作业保存
export const WORK_SAVE = 'WORK_SAVE';
// 用户跳转
export const USER_REDIRECT = 'USER_REDIRECT';
// 清除redirect
export const CLEAR_REDIRECT = 'CLEAR_REDIRECT';
// 选择报警处置类型
export const SELECT_ALARMTYPE = 'SELECT_ALARMTYPE';

// 作业文件获取
export const WORK_FILE_LIST = 'WORK_FILE_LIST';

// 获取所有报警船轨迹
export const ALARM_HISTORY = 'ALARM_HISTORY';

// 清除所有报警船轨迹
export const CLEAR_ALARM_HISTORY = 'CLEAR_ALARM_HISTORY';
// 保存选中的作业信息
export const SAVE_WORK_INFO = 'SAVE_WORK_INFO';


// 渔区信息
export const FISHINGAREA_LIST = 'FISHINGAREA_LIST';

// 摄像头列表信息
export const CAMERA_LIST = 'CAMERA_LIST';

// 保存选择的船
export const SELECT_SHIP = 'SELECT_SHIP';

// 是否隐藏其他船
export const HIDE_SHIPS = 'HIDE_SHIPS';

// 地图Ais点位坐标
export const AIS_LIST = 'AIS_LIST';

// 地图ARPA点位坐标
export const ARPA_LIST = 'ARPA_LIST';

// 测试TEST
export const TEST = 'TEST';

// 测试雷达
export const TESTRADAR = 'TESTRADAR';

// 发送验证码成功
export const SEND_CODE_SUCCESS = 'SEND_CODE_SUCCESS'

// 绑定海域提交成功
export const BIND_SUCCESS = 'BIND_SUCCESS'

// 保存未处理申请记录列表
export const UNPROCESSED_LIST = 'UNPROCESSED_LIST'

// 保存已处理申请记录列表
export const FINISH_LIST = 'FINISH_LIST'

// new-----------------------------------------------------

// 待领取事件列表
export const PENDING_TASK_LIST = 'PENDING_TASK_LIST'

// 待执行事件列表 
export const PROCESSING_TASK_LIST = 'PROCESSING_TASK_LIST'

// 待执行事件点位列表
export const POINT_LIST = 'POINT_LIST'

// 待执行事件点位设备列表  DEVICE_INFO
export const POINT_DEVICE_LIST = 'POINT_DEVICE_LIST'

// 暂存设备详情
export const DEVICE_INFO = 'DEVICE_INFO'

// 已完成任务列表
export const FINISH_TASK_LIST = 'FINISH_TASK_LIST'

// 异常上报提交状态 
export const EXCEPTION_SUBMIT_STATUS = 'EXCEPTION_SUBMIT_STATUS'

// 获取网格树 
export const GRID_TREE = 'GRID_TREE'

//查询部门
export const QUERY_DEPARTMENT = 'QUERY_DEPARTMENT'

//查询岗位
export const QUERY_POST = 'QUERY_POST'

// 跳转到异常上报页面时,暂存任务相关数据,异常提交时,同时提交此任务 
export const WILL_PAYLOAD = 'WILL_PAYLOAD'


// 点位列表,每个数据的网格信息 
export const GRID_LIST = 'GRID_LIST'

// 查询所有设备分类及分类下的用途  
export const ALL_DEVICE_TYPE = 'ALL_DEVICE_TYPE'

// 查询设备列表 
export const DEVICE_LIST = 'DEVICE_LIST'

// 查询所有消息 
export const ALL_NOTICE = 'ALL_NOTICE'

// 已超时任务 
export const OVERTIME_TASK_LIST = 'OVERTIME_TASK_LIST'

// 是否在打卡区域内 
export const IS_IN_AREA = 'IS_IN_AREA'

// 当天打卡情况 
export const SIGN_INFO = 'SIGN_INFO'

// 打卡记录列表 
export const SIGN_IN_LIST = 'SIGN_IN_LIST'

// 消息详情信息 
export const NOTICE_DETAIL = 'NOTICE_DETAIL'


// 墓碑列表信息
export const MUBEILIST = 'MUBEILIST'


// 装饰树列表
export const TREELIST = 'TREELIST'


// 小品列表
export const ITEMSLIST = 'ITEMSLIST'


// 相框列表
export const PHOTOLIST = 'PHOTOLIST'


// 刻字列表
export const TEXTLIST = 'TEXTLIST'


// 套餐列表
export const TAOCAN = 'TAOCAN'


// 我的方案列表
export const MYDIYLIST = 'MYDIYLIST'

// 时空信箱 信件列表
export const SPACE_TIME_MAIL_LIST = 'SPACE_TIME_MAIL_LIST'
// 时空信箱 信件详情
export const SPACE_TIME_MAIL_DETAIL = 'SPACE_TIME_MAIL_DETAIL'

