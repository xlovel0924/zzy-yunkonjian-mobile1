import React from 'react';
import { connect } from 'react-redux';
// import BScroll from 'better-scroll';
import _ from 'lodash';
import Head from '@/components/head';
import history from '@/history';
import form from '@/components/form';
import AlarmDetail from './alarmDetail';
import DeviceDetail from './deviceDetail';
import WorkDetail from './workDetail';
import BScroll from 'better-scroll';
import { Badge } from 'antd-mobile';
// import AlarmWorking from './alarmWorking';
// import Websocket from 'react-websocket';
// import {WebsocketHttp}from '@/server/service';
// import {getNowFormatDate} from './../../../utils/baseUtil';
import './index.css';

@connect(
  state=>({ task:state.task }),
  {  }
)
@form
class libraryDeviceInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 1,
      deviceInfo: {},
    }
    this.alarmWrapper = ref =>{this.alarmWrappers=ref};
  }

  componentDidMount(){
    this.alarmScroll = new BScroll(this.alarmWrappers, {
      click: true
    })
  }

  p(s) {
    return s < 10 ? '0' + s : s
  }

  onOpen=()=>{
    // console.log('websocket open')
  }

  onMessage =(res)=> {
    if(!_.isEmpty(res)){
      // this.props.alarmPendingListMock()
      // this.props.alarmFinishListMock()
    }
    // console.log('res')
  }

  onClose =()=> {
    // console.log('websocket close')
  }

  //返回功能
  handleBack() {
    history.goBack();
  }

  //重新赋值selectValue,改变标签背景颜色
  handleChange=(value)=>{
    if(value===1){
      // this.props.alarmPendingListMock()
    }else{
      // this.props.alarmFinishListMock()
    }
    this.setState({
      selectValue: value,
    })
  }

  //查看详情页面跳转
  updateGoDetailPage=(props,v)=>{
    props.history.push(`/alarmdetail/${v}`);
  }

  //接口数据处理赋值
  componentWillReceiveProps(nextProps){
    // console.log('nextProps--------')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task.deviceInfo)){
        this.setState({
          deviceInfo: nextProps.task.deviceInfo
        })
      }
    }
  }

  render(){
    const { selectValue, deviceInfo } = this.state;
    return (
      <div className='libraryDeviceInfo-body'>
        <Head title='设备详情' handleBack={this.handleBack} style={{color:" #333333 ",fontsize:"17px"}}></Head>
        <div className='libraryDeviceInfo-content'>
          <div className='libraryDeviceInfo-head'>
            <div 
              className={selectValue===1?'libraryDeviceInfo-head-name libraryDeviceInfo-head-name-active':'libraryDeviceInfo-head-name'}
              onClick={()=>this.handleChange(1)}
            >
              设备信息
            </div>
            <div  
              className={selectValue===2?'libraryDeviceInfo-head-name libraryDeviceInfo-head-name-active':'libraryDeviceInfo-head-name'} 
              onClick={()=>this.handleChange(2)}
            >
              工单信息
            </div>
            <div
              className={selectValue===3?'libraryDeviceInfo-head-name libraryDeviceInfo-head-name-active':'libraryDeviceInfo-head-name'}
              onClick={()=>this.handleChange(3)}
            >
              告警信息
            </div>
          </div>
          <div className='libraryDeviceInfo-content-list'>
            <div className='content-list' ref={this.alarmWrapper}>
              <div>
                { // 设备信息
                  selectValue===1?<DeviceDetail deviceInfo={deviceInfo} props={this.props}
                  updateGoDetailPage={this.updateGoDetailPage} ></DeviceDetail>:
                  selectValue===2?
                  // 工单信息
                  <WorkDetail props={this.props} updateGoDetailPage={this.updateGoDetailPage}></WorkDetail>:
                  // 告警信息
                  <AlarmDetail props={this.props} updateGoDetailPage={this.updateGoDetailPage}></AlarmDetail>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default libraryDeviceInfo;