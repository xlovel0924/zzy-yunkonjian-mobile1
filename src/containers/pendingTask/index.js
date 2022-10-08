import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import moment from 'moment';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { Modal, List, Progress, Menu, NavBar, Icon } from 'antd-mobile';
import Head from './../../components/head';
import history from '@/history';
import { pendingTask, getTask } from '@/redux/task/task.action';
import noalarm from '@/assets/img/noAlarm.svg';
import iconTask from '@/assets/img/iconTask.png';
import iconReport from '@/assets/img/iconReport.png';
import form from './../../components/form';
import './index.css';

const dateFormat = 'YYYY-MM-DD HH:mm:ss'
const Item = List.Item;
const menuData = [
  {
    value: '0',
    label: '所有任务',
  }, {
    value: '1',
    label: '巡检任务',
  }, {
    value: '2',
    label: '保养任务',
  },
  {
    value: '3',
    label: '设备运行任务',
  },
  // {
  //   value: '4',
  //   label: '事件上报',
  // },
  // {
  //   value: '5',
  //   label: '设备报修',
  // },
];
const navbarText = ['所有任务', '巡检任务', '保养任务', '设备运行任务', '事件上报', '设备报修'];
@connect(
  state=>({task:state.task}),
  { pendingTask, getTask }
)
@withRouter
@form
class PendingTask extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      pendingTaskList:[],
      taskRecord: {},                           // 任务详情
      taskInfoVisible: false,                   // 任务详情弹窗
      taskType:['0'],                         // 0所有任务 1巡检任务 2保养任务 3设备运行任务 4事件上报 5设备报修
      showMenu: false,                // 下拉菜单开关
      pendingPayload: {
        "drawNodeID": "",
        "drawState": "0",
        "handleNodeID": "",
        "pageIndex": "1",
        "receiveNodeID": "",
        "searchPara1": "",
        "searchPara10": "",
        "searchPara11": "",
        "searchPara12": "",
        "searchPara13": "",
        "searchPara14": "",
        "searchPara15": "",
        "searchPara2": "",
        "searchPara3": "",
        "searchPara4": "",
        "searchPara5": "2017-04-9",
        "searchPara6": "",
        "searchPara7": "",
        "searchPara8": "",
        "searchPara9": "",
        "serviceInstID": "",
        "serviceInstName": "",
        "serviceInstSeq": "",
        "serviceType": "",
        "sqlCondition": "",
        "tableNameStr": "",
        "toDrawNodeID": ""
      },
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }

  componentDidMount(){
    // 获取未领取任务列表
    const tempPayload = {
      "drawNodeID": "",
      "drawState": "0",
      "handleNodeID": "",
      "pageIndex": "1",
      "receiveNodeID": "",
      "searchPara1": "",
      "searchPara10": "",
      "searchPara11": "",
      "searchPara12": "",
      "searchPara13": "",
      "searchPara14": "",
      "searchPara15": "",
      "searchPara2": "",
      "searchPara3": "",
      "searchPara4": "",
      "searchPara5": "2017-04-9",
      "searchPara6": "",
      "searchPara7": "",
      "searchPara8": "",
      "searchPara9": "",
      "serviceInstID": "",
      "serviceInstName": "",
      "serviceInstSeq": "",
      "serviceType": "",
      "sqlCondition": "",
      "tableNameStr": "",
      "toDrawNodeID": !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:''
    }
    this.setState({
      pendingPayload: tempPayload
    })
    this.props.pendingTask( tempPayload );
    this.initScroll();
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
    // console.log(this.alarmDetailScroll);
  }

  handleBack() {
    history.goBack();
  }

  // 开关领取弹窗
  handleModal=(flag, record, event)=>{
    if(event){
      event.stopPropagation();
    }
    this.setState({
      taskInfoVisible: flag,
      taskRecord: record
    })
  }

  // 领取任务提交
  handleSubmit=(workItemInstID, nodeInstanceID)=>{
    const {pendingPayload} = this.state;
    this.props.getTask(workItemInstID, nodeInstanceID, pendingPayload);
    this.handleModal(false,{});
    // setTimeout(() => {
    //   this.props.pendingTask( pendingPayload );
    // }, 500);
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task) && !_.isEmpty(nextProps.task.pendingTaskList)){
        this.setState({
          pendingTaskList:nextProps.task.pendingTaskList.recordList
        })
      }else{
        this.setState({
          pendingTaskList:[]
        })
      }
    }
  }

  // 开关下拉菜单
  handleClick=()=>{
    this.setState({
      showMenu:!this.state.showMenu
    })
  }
  
  // 下拉菜单选择回调
  onChange=(v)=>{
    const {pendingPayload} = this.state;
    this.setState({
      taskType:v
    })
    // 请求接口
    let payload = pendingPayload;
    payload.serviceType=v[0]==='0'?'':v[0];
    this.props.pendingTask( payload );
  }

  // 计算剩余时间进度条百分比
  timePercent=(startTime, endTime)=>{
    const start = moment(startTime, dateFormat).valueOf();
    const end = moment(endTime, dateFormat);
    const leftTime = parseInt((end-moment().valueOf())/60000)
    const allTime = parseInt((end-start)/60000)
    return parseInt(100*leftTime/allTime)
  }

  // 计算剩余时间
  leftTime=(endTime)=>{
    const end = moment(endTime, dateFormat);
    // 剩余时间(秒)
    const leftTime = parseInt((end-moment().valueOf())/1000)
    return `${parseInt(leftTime/86400)}天 ${parseInt(leftTime%86400/3600)}小时 ${parseInt(leftTime%86400%3600/60)}分钟`
  }

  render(){
    const { 
      pendingTaskList,
      taskInfoVisible,
      taskRecord,
      taskType,
      showMenu,
    } = this.state;
    const menu = (
      <Menu
        height={336}
        className="single-foo-menu"
        data={menuData}
        value={taskType}
        level={1}
        onChange={(v)=>this.onChange(v)}
      />
    );

    return (
      <div className='r-pendingTask'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='待领取任务' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='navBar' style={{zIndex:100}} >
          <NavBar
            rightContent={<Icon type={showMenu?'up':'down'} />}
            leftContent='任务类型'
            mode="light"
            onClick={this.handleClick}
          >
            {navbarText[parseInt(taskType[0])]}
          </NavBar>
          {showMenu?menu:null}
        </div>
        <div className='pendingTask-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(pendingTaskList)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无待领取任务</div>
              </div>
              :
              pendingTaskList.map((e,index)=>((
                (e._WorkItem_Instance.serviceType!=='4' && e._WorkItem_Instance.serviceType!=='5')?<List key={index}>
                  <Link
                    to={
                      (e._WorkItem_Instance.serviceType==='4' || e._WorkItem_Instance.serviceType==='5')?
                      `/pendingreportdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`:
                      `/pendingtaskdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`
                    }
                  >
                    <Item className='list-item' style={{marginBottom:10}}>
                      <div style={{ borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}}>
                        <div style={{fontSize:'15px', color:'#333', lineHeight:'34px', fontWeight:500}} >
                          <img src={(e._WorkItem_Instance.serviceType==='4' || e._WorkItem_Instance.serviceType==='5')?iconReport:iconTask} alt='' width={10} height={10} style={{marginRight:6}} />
                          {e.serviceTypeName}
                        </div>
                        <div 
                          onTouchEnd={ (event)=>this.handleModal(true, e, event) }
                          style={{
                            width:50,height:28, marginTop:3, lineHeight:'28px', backgroundColor:'#0088FE', 
                            textAlign:'center', fontSize:'13px',
                            borderRadius:'4px', color:'#fff'
                          }}
                        >
                          领取
                        </div>
                      </div>
                      <div style={{fontSize:'12px', color:'#bbb', margin:'2px 0 4px 0px',width:'100%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                        所属计划:&nbsp;&nbsp;<span style={{color:'#555'}}>{e._WorkItem_Instance.serviceInstName}</span>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{fontSize:'12px', color:'#bbb', margin:'2px 0 4px 0px'}}>
                          开始时间:&nbsp;&nbsp;
                          <span style={{color:'#555'}}>
                            {moment(e.processStartedDateTime, dateFormat).format('MM-DD HH:mm')}
                          </span>
                        </div>
                        <div style={{fontSize:'12px', color:'#bbb', margin:'2px 0 4px 0px'}}>
                          要求完成时间:&nbsp;&nbsp;
                          <span style={{color:'#555'}}>
                            {moment(e._WorkItem_Instance.remindDate, dateFormat).format('MM-DD HH:mm')}
                          </span>
                        </div>
                      </div>
                        
                      <div style={{fontSize:'12px', color:'#888', margin:'2px 0 0px 0px', display:'flex', justifyContent:'left'}}>
                        <div style={{width:60, color:'#555'}}>剩余时间: </div>
                        {/* <Progress percent={this.timePercent(e.processStartedDateTime, e._WorkItem_Instance.remindDate)} */}
                        <Progress percent={
                          this.timePercent(e.processStartedDateTime, e._WorkItem_Instance.remindDate)<0?0:
                          this.timePercent(e.processStartedDateTime, e._WorkItem_Instance.remindDate)
                        }
                          position="normal" appearTransition
                          style={{borderRadius: '4px', width: 'calc(100% - 170px)', backgroundColor: '#eee', height: 8, margin: 'auto 0' }}
                          barStyle={{
                            borderRadius: '4px', 
                            borderColor: this.timePercent(e.processStartedDateTime, e._WorkItem_Instance.remindDate)>30?'#0088FE':'#FF796A',
                            borderWidth: 4
                          }}
                        />
                        <div style={{width:110, textAlign:'right', color:'#FF796A'}}>
                          {moment(e._WorkItem_Instance.remindDate, dateFormat).valueOf() > moment().valueOf()?this.leftTime(e._WorkItem_Instance.remindDate):'已超时'}
                        </div>
                      </div>
                    </Item>
                  </Link>
                </List>:null
              )))
            }
          </div>
        </div>
        {taskInfoVisible?
          <Modal
            maskClosable
            transparent
            closable
            visible={taskInfoVisible}
            onClose={()=>this.handleModal(false,{})}
            title='领取任务'
            footer={[
              { text: '关闭', onPress: () => this.handleModal(false,{}) },
              { text: '领取', onPress: () => { this.handleSubmit(taskRecord._WorkItem_Instance.id, !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'')} },
            ]}
          >
            <div style={{height:'80%', textAlign:'left'}}>
              任务名称: {taskRecord.serviceTypeName}<br/>
              开始时间: {taskRecord.processStartedDateTime}
            </div>
          </Modal>:null
        }  
      </div>
    )
  }
}

export default PendingTask;