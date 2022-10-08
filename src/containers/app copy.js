import React from 'react'
import { Route } from 'react-router-dom'
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
import UserSelf from "./userSelf";
import CreateFamilyTree from "./family/createFamilyTree"

import Search from "./search"
// 云服务
import CloundService from "./cloudService/cloudService"
// 云纪念馆
import Memorial from "./memorial/memorial"
// 世代图谱
import GenerationMap from "./family/generationMap"
// 家谱列表
import FamilyTreeList from "./family/familyTreeList"
// 追根溯源
import FindRoot from "./family/findRoot"
// 追根溯源详情
import FindRootDetail from "./family/findRootDetail"

// 验证登录
import ForgetPwd from './user/forgetPwd'
import Accountlogin from './user/Accountlogin'
// MyDiy
import MyDiy from './mydiy';
// 带看
import DaiKan from './daiKan';

import Diymuxue from './diymuxue';
import Makemudi from './makemudi';
import Diyinformation from './diyinformation';
import LoginRoute from './../components/loginRoute';
import { withRouter } from 'react-router-dom';
import { showTabbar } from '@/utils';
import Tabbar from "../components/tabbar"
import 'lib-flexible'

import FamilyTree from "./family/familyTree/index2";
@connect(
  state => ({}),
  {}
)
@withRouter
class Containers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  }
  onDeviceReady = () => {
    console.log("===[设备准备就绪]===")
    try {
      window.JPush.init()
      window.JPush.setDebugMode(true)
      console.log("===[初始化极光推送]===")
      // eslint-disable-next-line no-undef
      if (cordova.platformId !== "Android") {
        window.JPush.setApplicationIconBadgeNumber(0)
      }
    } catch (exception) {
      console.log(exception)
    }
    document.addEventListener("jpush.receiveRegistrationId", function (event) {
      console.log(event.registrationId + "receiveRegistrationId" + JSON.stringify(event))
      localStorage.setItem('registrationId', event.registrationId)
    }, false)
  }

  render () {
    const _this = this
    document.addEventListener("jpush.openNotification", function (event) {
      //打开通知
      try {
        var url = event.extras.url
        _this.props.history.push(url)
        //相应的动作
      } catch (exception) {
        console.log("JPushPlugin:onOpenNotification" + exception)
      }
    }, false)
    let pathname = this.props.location.pathname
    // if (pathname === '/') {
    //   pathname = '/index'
    // }
    const show = (showTabbar.indexOf(pathname) >= 0)
    return (
      <div className='r-index'>
        <LoginRoute></LoginRoute>
        <AnimatedRouter>
        {/* <Route path='/' exact={true} component={TestRadar}></Route> */}
          <Route path='/' exact={true} component={Login}></Route>
          {/*<Route path='/login' exact={true} component={Login}></Route>*/}
          {/*<Route path='/Accountlogin' exact={true} component={Accountlogin}></Route>*/}
          {/*<Route path='/Verifylogin' exact={true} component={Verifylogin}></Route>*/}
          {/*<Route path='/register' exact={true} component={Register}></Route>*/}
          {/*<Route path='/Diymuxue' exact={true} component={Diymuxue}></Route>*/}
          {/*<Route path='/Makemudi' exact={true} component={Makemudi}></Route>*/}
          {/*<Route path='/Diyinformation' exact={true} component={Diyinformation}></Route>*/}
          <Route path='/forgetPwd' exact={true} component={ForgetPwd}></Route>
          {/*<Route path='/mydiy' exact={true} component={MyDiy}></Route>*/}
          {/*<Route path='/daikan' exact={true} component={DaiKan}></Route>*/}
          <Route path='/familytree' exact={true} component={FamilyTree} />
          <Route path='/familytreehomepage' exact={true} component={FamilyTreeHomePage} />
          <Route path='/family-tree-detail/:id?' exact={true} component={FamilyTreeDetail} />
          <Route path='/photo-studio-homepage' exact={true} component={PhotoStudioHomePage} />
          <Route path='/confirm' exact={true} component={Confirm} />
          <Route path="/create-family" exact={true} component={CreateFamily} />
          <Route path="/clound-service" exact={true} component={CloundService} />
          <Route path="/memorial" exact={true} component={Memorial} />
          
          <Route path="/index" exact={true} component={Home} />
          <Route path="/user-self" exact={true} component={UserSelf} />
          <Route path="/search" exact={true} component={Search} />
          <Route path="/create-family-tree" exact={true} component={CreateFamilyTree} />
          <Route path="/generation-map/:id?" exact={true} component={GenerationMap} />
          <Route path="/family-tree-list" exact={true} component={FamilyTreeList} />
          <Route path="/find-root" exact={true} component={FindRoot} />
          <Route path="/find-root-detail" exact={true} component={FindRootDetail} />
        </AnimatedRouter>
         {show ? <Tabbar ></Tabbar> : ''}
      </div>
    )
  }
}

export default Containers