import React from 'react';
import { connect } from 'react-redux';
// import BScroll from 'better-scroll';
import _ from 'lodash';
import { alarmPendingListMock, alarmFinishListMock } from '../../../redux/alarm/alarm.action';
import Head from './../../../components/head';
import history from './../../../history';
import form from './../../../components/form';
import BScroll from 'better-scroll';
import { Badge } from 'antd-mobile';
// import AlarmWorking from './alarmWorking';
// import Websocket from 'react-websocket';
// import {WebsocketHttp}from '@/server/service';
// import {getNowFormatDate} from './../../../utils/baseUtil';
import AllMsg from '../allMsg'; 
import RoutineTask from '../routineTask';
import Emergency from '../emergency';
import SystemMsg from '../systemMsg';
import './index.css';

@connect(
  state=>state.alarm,
  { alarmPendingListMock, alarmFinishListMock }
)
@form
class Alarm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showAlarmModal: false,
      selectValue: 1,
      alarmPendinglist:[],
      alarmFinishlist:[],
      alarmTotal:0,
      alarmFinishTotal:0,
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
    // if(value===1){
    //   // this.props.alarmPendingListMock()
    // }else{
    //   this.props.alarmFinishListMock()
    // }
    this.setState({
      selectValue: value,
    })
  }
//查看详情页面跳转
  updateGoDetailPage=(props,v)=>{
    props.history.push(`/noticedetail/${v}`);
  }
  //接口数据处理赋值
  UNSAFE_componentWillReceiveProps(nextProps){
    // console.log('nextProps---------------------------')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      // if(!_.isEmpty(nextProps.alarmPendinglist)){
      //   this.setState({
      //     alarmPendinglist: nextProps.alarmPendinglist,
      //     alarmTotal:nextProps.alarmPendinglist.length,
      //   })
      // }else{
      //   this.setState({
      //     alarmPendinglist: [],
      //     alarmTotal:0,
      //   })
      // }
    };
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.alarmFinishlist)){
        this.setState({
          alarmFinishlist: nextProps.alarmFinishlist,
          alarmFinishTotal:nextProps.alarmFinishlist.length,
        })
      }
    };
  }

  render(){
    const { selectValue,alarmPendinglist, alarmFinishlist, alarmTotal, alarmFinishTotal } = this.state;

    // let url = '';
    // let userId = JSON.parse(localStorage.getItem('user')).id;
    // let longitude = parseFloat(JSON.parse(sessionStorage.getItem('mapCenter'))[1]);
    // let latitude = parseFloat(JSON.parse(sessionStorage.getItem('mapCenter'))[0]);
    // const param = {
    //   "userId": userId,
    //   "longitude": longitude,
    //   "latitude": latitude,
    // };
    // let data = JSON.stringify(param);
    // url = `ws://${WebsocketHttp}websocket?param=`+encodeURIComponent(data);

    return (
      <div className='alarm-body'>
        <Head title='公告中心' handleBack={this.handleBack} style={{color:" #333333 ",fontsize:"17px"}}></Head>
        <div className='alarm-content'>
          <div className='alarm-head'>
            <div 
              className={selectValue===1?'alarm-head-name alarm-head-name-active':'alarm-head-name'}
              onClick={()=>this.handleChange(1)}
            >
              <span style={selectValue===1?{fontWeight:600}:{fontWeight:200}}>全部公告</span>
            </div>
            <div
              className={selectValue===2?'alarm-head-name alarm-head-name-active':'alarm-head-name'}
              onClick={()=>this.handleChange(2)}
            >
              常规任务
            </div>
            <div
              className={selectValue===3?'alarm-head-name alarm-head-name-active':'alarm-head-name'}
              onClick={()=>this.handleChange(3)}
            >
              突发任务
            </div>
            <div
              className={selectValue===4?'alarm-head-name alarm-head-name-active':'alarm-head-name'}
              onClick={()=>this.handleChange(4)}
            >
              系统消息
            </div>
          </div>
          <div className='alarm-content-list'>
            <div className='content-list' ref={this.alarmWrapper}>
              <div>
                {
                // 全部
                selectValue===1?
                  <AllMsg props={this.props} updateGoDetailPage={this.updateGoDetailPage} />
                // 常规任务
                :selectValue===2?
                  <RoutineTask props={this.props} updateGoDetailPage={this.updateGoDetailPage} />
                // 突发事件 
                :selectValue===3?
                  <Emergency props={this.props} updateGoDetailPage={this.updateGoDetailPage} />
                // 系统消息 
                :selectValue===4?
                  <SystemMsg props={this.props} updateGoDetailPage={this.updateGoDetailPage} />
                :null
                }
              </div>
            </div>
          </div>
        </div>
        {/* {url !== '' ? (
          <Websocket
            reconnect
            url={url}
            onOpen={() => this.onOpen()}
            onMessage={res => this.onMessage(res)}
            onClose={() => this.onClose()}
          />
        ) : (
          ''
        )} */}
      </div>
    )
  }
}

export default Alarm;