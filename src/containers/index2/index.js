import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'

import 'proj4'
import 'proj4leaflet'
import 'leaflet-wfst'
import 'leaflet-rotatedmarker'
import _ from 'lodash'
// import moment from 'moment';
import 'leaflet.chinatmsproviders'
import { pendingTask, processingTask, overTimeTask } from '@/redux/task/task.action'
import { updateUserRegistrationId } from '@/redux/user/user.action'
// import IndexHead from '@/components/indexHead';
import diyimg from "../../assets/img/homeimg/diyimg.png"
import yun3 from "../../assets/img/yun3.png"
import yun4 from "../../assets/img/yun4.png"
import './index.css'

const tabs = [
  { title: '全部' },
  { title: '告警事件' },
  { title: '订阅事件' },
]

@connect(
  state => ({ task: state.task, user: state.user }),
  { pendingTask, processingTask, updateUserRegistrationId, overTimeTask }
)
@withRouter
class Home1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      userInfo: {},
      cameraList: [],
      pendingTaskTotal: 0,
      processingTaskTotal: 0,
      overTimeTaskTotal: 0,
      data: ['1', '2', '3'],  // 走马灯
      imgHeight: 128,
    }
    this.map = null
    this.monitorWrapper = ref => { this.monitorWrappers = ref }
  };

  componentDidMount() {

  };

  onDeviceReady = () => { //设备准备完毕
    const _this = this

  }

  componentWillReceiveProps(nextProps) {
    // console.log('index-----------nextProps')
    // console.log(nextProps) 
    if (!_.isEmpty(nextProps)) {
      if (!_.isEmpty(nextProps.task)) {
        if (!_.isEmpty(nextProps.task.pendingTaskList)) {
          let count = 0
          nextProps.task.pendingTaskList.recordList.map(e => {
            if (e._WorkItem_Instance.serviceType !== '4' && e._WorkItem_Instance.serviceType !== '5') {
              count += 1
            }
          })
          this.setState({
            pendingTaskTotal: count
          })
        }
        if (!_.isEmpty(nextProps.task.processingTaskList)) {
          this.setState({
            processingTaskTotal: nextProps.task.processingTaskList.recordList.length
          })
        }
        if (!_.isEmpty(nextProps.task.overTimeTaskList)) {
          this.setState({
            overTimeTaskTotal: nextProps.task.overTimeTaskList.recordList.length
          })
        }
      }
    }
  }

  // 卸载组件时清除定时器
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  // 关闭模态框
  handleCloseModal = (key) => {
    this.setState({
      [key]: false,
    })
  }


  // 打开侧边栏（个人信息）
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open })
  };
  // 跳转页面
  handlePush(key) {
    this.props.history.push(`${key}`)
    // document.getElementsByClassName("homediyimg")[0].style.display="block !inprotant";
  };

  callback = (camName, camIP, camPort, chanelID, user, password) => {
    const param = {
      camName: camName,
      camIP: camIP,
      camPort: parseInt(camPort),
      chanelID: parseInt(chanelID),
      user: user,
      password: password,
    }
    // eslint-disable-next-line no-undef
    Hikvision.openCam(JSON.stringify(param),
      function () {
        //         console.log('bindOpenCam success',1);
      },
      function () {
        //         console.log('bindOpenCam error',1);
      })
  }

  render() {
    const {
      userInfo,
    } = this.state

    return (
      <>
        <div className='homeConten'>
          <img src={yun3} className="yun1" alt="" />
          <img src={yun4} className="yun2" alt="" />
          <script>
            {setTimeout(function () {

              var img1 = document.getElementsByClassName("yun1")[0];
              var img2 = document.getElementsByClassName("yun2")[0];
              img1.style.display = "none";
              img2.style.display = "none";

            }, 10000)}
          </script>
          <iframe
            id='iframe3D_BIM4D'
            width="100%"
            height={`${window.innerHeight}+px`}
            className={this.state.lookheight}
            src='http://47.94.138.117:8005/'
            frameBorder="no" border="0" scrolling="no"
            allowtransparency="yes"
            sandbox="allow-scripts allow-forms allow-same-origin"
          />
          <div className='homediyimg' onClick={() => this.handlePush('diymuxue')} >
            <img src={diyimg} />
          </div>
        </div>

      </>


    )
  }
}

export default Home1