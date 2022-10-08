import {SON_LIST,CONCER_FAMILY_LIST,CONDITION_FAMILY_LIST, FAMILY_LIST,ERROR_MSG,SUCCESS_MSG,FAMILY,CREATE_FAMILY,
    EDIT_FAMILY_LIST,QUERY_GENEALOGY_MEMBER,ADD_MEMBER,MEMBER_LIST,FAMILY_LIST_BY_MEMBER_ID,WIFE_LIST,MEMBER_INFO,CONCERN_INFO,
    BLESSINGS, SELECT_PEOPLE_INFO,COPY_DATA_INFO, ALLINCENSEBURNER, INSENSETYPE, INSENSELIST,SELECT_AVATAR,TEXT_REVIEW
} from '@/constants';

// 初始状态
const initState={
    message: "",
    familyList: {}, // 家谱信息
    family: [], // 家族信息
    createFamily: {}, // 创建家谱
    editFamily: {},  // 修改家谱
    genealogyMember: {},    // 家谱世代关系
    addMember: {},   // 添加家谱人员
    memberList: {},   // 家谱世代图列表
    familyListByMemberId: {},  // 根据用户查家谱
    conditionFamilyList: {},  // 根据条件查家谱
    concerFamilyList: {},   // 关注列表
    sonList: [],   // 儿子列表
    wifeList: [],   // 妻子列表
    memberInfo: {}, // 个人信息
    concernInfo: {},    // 根据家谱id查询关注人信息
    blessings: [],  // 许愿祈福列表
    selectPeopleInfo: {}  ,  // 添加姓名时选择人信息
    copyDataInfo: {},
    allIncenseBurner: [],   // 所有香炉列表
    insenseTypeList: [],    // 所有香列表
    insenseList: [],    // 上香状态
    avatarUrl: "",// 选择的头像
    textReviewData: {}, // 验证结果
}
// reducer 
export function familyReducer(state=initState, action){
    console.log(action,"action")
    switch(action.type){
        case TEXT_REVIEW:
            return {...state, textReviewData: action.payload}
        case SELECT_AVATAR:
            return {...state, avatarUrl: action.payload}
        case COPY_DATA_INFO:
            return {...state, copyDataInfo: action.payload}
        case SELECT_PEOPLE_INFO:
            return {...state, selectPeopleInfo: action.payload}
        case ERROR_MSG:
            return {...state,message: action.message}
        //    许愿祈福列表
        case BLESSINGS:
            return {...state, blessings: action.payload}
        //    所有香列表
        case INSENSETYPE:
            return {...state, insenseTypeList: action.payload}
        //    所有香炉列表 
        case ALLINCENSEBURNER:
            return {...state, allIncenseBurner: action.payload}
        //    上香状态 
        case INSENSELIST:
            return {...state, insenseList: action.payload}
        //    关注人信息
        case CONCERN_INFO:
            return {...state,concernInfo: action.payload}
        //    关注列表
        case CONCER_FAMILY_LIST:
            return {...state,concerFamilyList: action.payload}
        case MEMBER_INFO:
            return {...state,memberInfo: action.payload}
        //    条件查询
        case CONDITION_FAMILY_LIST:
            return {...state,conditionFamilyList: action.payload}
            // 家庭列表
        case FAMILY_LIST:
            return {...state,familyList: action.payload}
        case SUCCESS_MSG:
            return {...state,message: action.payload}
        //     儿子列表
        case SON_LIST:
            return {...state,sonList: action.payload}
        //    妻子列表
        case WIFE_LIST:
            return {...state,wifeList: action.payload}
        // 家庭
        case FAMILY:
            return {...state,family: action.payload}
        case CREATE_FAMILY:
            return {...state,createFamily: action.payload}
        case EDIT_FAMILY_LIST:
            return {...state,editFamily: action.payload}
        case QUERY_GENEALOGY_MEMBER:
            return {...state,genealogyMember: action.payload}
        case ADD_MEMBER:
            return {...state,addMember:action.payload}
        case MEMBER_LIST:
            return {...state,memberList: action.payload}
        case FAMILY_LIST_BY_MEMBER_ID:
            return {...state,familyListByMemberId: action.payload}
        default:
            return state
    }
}