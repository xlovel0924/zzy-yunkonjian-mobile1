import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// 过度效果
import AnimatedRouter from 'react-animated-router'
import 'react-animated-router/animate.css'
import Login from './user/login'
import Home from './index'
import FamilyTreeHomePage from "./family/familyTreeHomePage"
import FamilyTreeDetail from "./family/familyTreeDetail"
import PhotoStudioHomePage from "./photoStudio/photoStudioHomePage"
import Confirm from "./family/confirm"
import CreateFamily from "./family/createFamily"
import CreateFamilyTree from "./family/createFamilyTree"

import Search from "./search"
// 云服务
import CloundService from "./cloudService/cloudService"
// 云纪念馆
import MemorialPublicity from "./cloudMemorial/PublicityPage"
import MemorialHome from './cloudMemorial/HomePage'
// 世代图谱
import GenerationMap from "./family/generationMap"
// 家谱列表
import FamilyTreeList from "./family/familyTreeList"
// 追根溯源
import FindRoot from "./family/findRoot"
// 追根溯源详情
import FindRootDetail from "./family/findRootDetail"
// 首页地址选择
import SelectAddress from "./selectAddress"
// 关注我的人
import FocusMe from "./family/FocusMe"
// 许愿祈福
import Blessings from "./family/blessings"
// 选择家徽
import HouseBadge from "./family/houseBadge"
// 时空信箱
import SpaceTimeMailHome from "./spaceTimeMail/home"
// 时空信箱信件列表
import SpaceTimeMailMailList from "./spaceTimeMail/mailList"
// 新建时空信箱
import CreateSpaceTimeMail from "./spaceTimeMail/createMail"
// 信件详情(公开)
import SpaceTimeMailDetail from "./spaceTimeMail/mailDetail"
// 信件详情(个人)
import SpaceTimeMailDetailPersonal from "./spaceTimeMail/mailDetailPersonal"







// 上香
import Incense from "./family/blessings/incense"
// 点灯
import Lantern from "./family/blessings/lantern"

// 家族纪事
import FamilyThree from "./family/familyThree"

// 验证登录
import ForgetPwd from './user/forgetPwd'
import Accountlogin from './user/Accountlogin'
// MyDiy
import MyDiy from './mydiy';
// 带看
import DaiKan from './daiKan';

// 缺省页面
import NoFound from './noFound';

// 云祭扫
import cloudMartyrs from './cloudMartyrs';
// 添加家谱关系人物选择
import selectPeople from "./family/selectPeople"
// 永恒照相馆
import PhotoEnternal from './photoStudio/photoStudioEternal';
import OldPhotoProcessing from './photoStudio/photoProcessing';
import PhotoColorRepair from './photoStudio/photoColorRepair';
import PhotoUpload from './photoStudio/photoUpload';
import photoThreeProduction from './photoStudio/photoThreeProduction';
import ThreeProductioning from './photoStudio/ThreeProductioning';
import LifeMicroFilm from './photoStudio/LifeMicroFilm';
import MicrofilmProduction from './photoStudio/MicrofilmProduction'

// 生平传记 -- 宣传
import BiographyPublicity from './lifeBiography/PublicityPage';
// 生平传记 -- 主页
import BiographyHome from './lifeBiography/HomePage';
// 生平传记 -- 浏览
import BiographyBrowse from './lifeBiography/BrowsePage';
// 生平传记 -- 编辑
import BiographyEdit from './lifeBiography/EditPage';

import Diymuxue from './diymuxue';
import Makemudi from './makemudi';
import Diyinformation from './diyinformation';
import LoginRoute from './../components/loginRoute';
import { withRouter } from 'react-router-dom';
import { showTabbar } from '@/utils';
import Tabbar from "../components/tabbar"

// 家族纪实添加
import AddContent from "./family/familyThree/addContent"
import 'lib-flexible'
// 家谱
import FamilyTree from "./family/familyTree";

import HistoriesDetail from "./family/familyThree/historiesDetail";

// 选择头像
import SelectAvatar from "./family/selectAvatar";

// 上传图片
import UploadImg from "./family/uploadImg";

// 个人中心
import UserSelf from "./userSelf";
// 我的相册
import MyPhoto from './user/MyPhoto';
// 我的预约
import MySubscribe from './user/MySubscribe';
// 联系客服
import ContactCustomerService from './user/ContactCustomerService';
// 个人资料
import PersonalData from './user/PersonalData';
// 系统设置
import SystemSettings from './user/SystemSettings';
// 系统通知
import SystemNotification from './user/SystemNotification';
// 系统公告
import SystemAnnouncement from './user/SystemAnnouncement';

import Date from './index/Components/Date';

import test from './test'

const routerMap = [
    { path: "/", exact: true, component: Home, auth: false },
    { path: "/forgetPwd", exact: true, component: ForgetPwd, auth: true },
    { path: "/familytree/:id?/:nodeId?", exact: true, component: FamilyTree, auth: true },
    { path: "/familytreehomepage", exact: true, component: FamilyTreeHomePage, auth: true },
    { path: "/family-tree-detail/:id?", exact: true, component: FamilyTreeDetail, auth: true },
    { path: "/photo-studio-homepage", exact: true, component: PhotoStudioHomePage, auth: true },
    { path: "/confirm", exact: true, component: Confirm, auth: true },
    { path: "/create-family", exact: true, component: CreateFamily, auth: true },
    { path: "/clound-service", exact: true, component: CloundService, auth: true },
    { path: "/cloud-martyrs", exact: true, component: cloudMartyrs, auth: true },
    { path: "/index", exact: true, component: Home, auth: false },
    { path: "/user-self", exact: true, component: UserSelf, auth: false },
    { path: "/search", exact: true, component: Search, auth: true },
    { path: "/create-family-tree/:id?/:genealogyId?/:generation?/:type?/:sex?", exact: true, component: CreateFamilyTree, auth: true },
    { path: "/generation-map/:id?", exact: true, component: GenerationMap, auth: true },
    { path: "/family-tree-list/:status?", exact: true, component: FamilyTreeList, auth: true },
    { path: "/find-root", exact: true, component: FindRoot, auth: true },
    { path: "/find-root-detail/:id?", exact: true, component: FindRootDetail, auth: true },
    { path: "/select-address", exact: true, component: SelectAddress, auth: true },
    { path: "/focus-me/:id?", exact: true, component: FocusMe, auth: true },
    { path: "/blessings/:id?", exact: true, component: Blessings, auth: true },
    { path: "/no-found", exact: true, component: NoFound, auth: false },
    { path: "/photo-enternal", exact: true, component: PhotoEnternal, auth: true },
    { path: "/biography-publicity", exact: true, component: BiographyPublicity, auth: true },
    { path: "/biography-home", exact: true, component: BiographyHome, auth: true },
    { path: "/biography-browse/:id?", exact: true, component: BiographyBrowse, auth: true },
    { path: "/biography-edit", exact: true, component: BiographyEdit, auth: true },
    { path: "/memorial-publicity", exact: true, component: MemorialPublicity, auth: true },
    { path: "/memorial-home", exact: true, component: MemorialHome, auth: true },
    { path: "/old-photo-processing", exact: true, component: OldPhotoProcessing, auth: true },
    { path: "/photo-color-repair/:status?", exact: true, component: PhotoColorRepair, auth: true },
    { path: "/old-photo-processing", exact: true, component: OldPhotoProcessing, auth: true },
    // { path: "/family-three", exact: true, component: FamilyThree, auth: true },
    // { path: "/add-content", exact: true, component: AddContent, auth: true },
    { path: "/photo-upload/:status/:imgUrl", exact: true, component: PhotoUpload, auth: true },
    { path: "/my-photo", exact: true, component: MyPhoto, auth: true },
    { path: "/my-subscribe", exact: true, component: MySubscribe, auth: true },
    { path: "/contact-customer-service", exact: true, component: ContactCustomerService, auth: true },
    { path: "/personal-data/:id?", exact: true, component: PersonalData, auth: true },
    { path: "/system-settings", exact: true, component: SystemSettings, auth: true },
    { path: "/photo-three-production", exact: true, component: photoThreeProduction, auth: true },
    { path: "/three-productioning/:threePhoto", exact: true, component: ThreeProductioning, auth: true },
    { path: "/family-three/:id?", exact: true, component: FamilyThree, auth: true },
    { path: "/add-content/:id?/:type?/:currId?", exact: true, component: AddContent, auth: true },
    { path: "/histories-detail/:id?/:type?/:currId?", exact: true, component: HistoriesDetail, auth: true },
    { path: "/system-notification", exact: true, component: SystemNotification, auth: true },
    { path: "/system-announcement", exact: true, component: SystemAnnouncement, auth: true },
    { path: "/life-micro-film", exact: true, component: LifeMicroFilm, auth: true },
    { path: "/microfilm-production/:id?", exact: true, component: MicrofilmProduction, auth: true },
    { path: "/select-people/:id?/:genealogyId?", exact: true, component: selectPeople, auth: true },
    { path: "/incense/:id?", exact: true, component: Incense, auth: true },

    { path: "/date", exact: true, component: Date, auth: true },
    { path: "/select-avatar", exact: true, component: SelectAvatar, auth: true },
    { path: "/upload-img/:avatarUrl?", exact: true, component: UploadImg, auth: true },
    { path: "/house-badge", exact: true, component: HouseBadge, auth: true },
    { path: "/lantern/:id?", exact: true, component: Lantern, auth: true },
    { path: "/space-time-mail-home", exact: true, component: SpaceTimeMailHome, auth: true },
    { path: "/space-time-mail-list", exact: true, component: SpaceTimeMailMailList, auth: true },
    { path: "/space-time-mail-create", exact: true, component: CreateSpaceTimeMail, auth: true },
    { path: "/space-time-mail-detail/:id?", exact: true, component: SpaceTimeMailDetail, auth: true },
    { path: "/space-time-mail-detail-personal/:id?", exact: true, component: SpaceTimeMailDetailPersonal, auth: true },
    { path: "/date", exact: true, component: Date, auth: true },
    { path: "/test", exact: true, component: test, auth: true }
]

export default routerMap;