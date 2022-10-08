import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import moment from 'moment';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { Modal, List, Progress, Menu, NavBar, Icon } from 'antd-mobile';
import Head from './../../components/head';
import history from '@/history';
import { overTimeTask, returnTask } from '@/redux/task/task.action';
import iconTask from '@/assets/img/iconTask.png';
import iconReport from '@/assets/img/iconReport.png';
import noalarm from '@/assets/img/noAlarm.svg';
import form from './../../components/form';
import './index.css';

const Item = List.Item;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

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
  { overTimeTask, returnTask }
)
@withRouter
@form
class OverTimeTask extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      overTimeTaskList:[],
      taskRecord: {},                           // 任务详情
      taskInfoVisible: false,                   // 任务详情弹窗
      taskType:['0'],                         // 1巡检任务 2保养任务 3设备运行任务
      showMenu: false,
      overTimePayload: {
        "drawNodeID": !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
        "drawState": "",
        "handleNodeID": "",
        "pageIndex": "1",
        "receiveNodeID": !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
        "searchPara1": "0",
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
        "toDrawNodeID": ""},
      }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }

  componentDidMount(){
    // 获取已超时任务列表
    const overTimePayload = {
      "drawNodeID": !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
      "drawState": "",
      "handleNodeID": "",
      "pageIndex": "1",
      "receiveNodeID": !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
      "searchPara1": "0",
      "searchPara10": "",
      "searchPara11": "",
      "searchPara12": "",
      "searchPara13": "",
      "searchPara14": "1",
      "searchPara15": "1",
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
    }
    this.setState({
      overTimePayload
    })
    this.props.overTimeTask( overTimePayload );
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

  // 跳转页面
  handleGoNextPage(key) {
    this.props.history.push(key);
  };

  // 开关详情弹窗
  handleModal=(flag, record, event)=>{
    if(event){
      event.stopPropagation();
    }
    this.setState({
      taskInfoVisible: flag,
      taskRecord: record
    })
  }

  // 确认退回任务
  handleSubmit=(workItemInstID, nodeInstanceID)=>{
    this.props.returnTask(workItemInstID, nodeInstanceID, this.state.overTimePayload);
    this.handleModal(false,{});
  }

  // 开关下拉菜单
  handleClick=()=>{
    this.setState({
      showMenu:!this.state.showMenu
    })
  }
  
  // 下拉菜单选择回调
  onChange=(v)=>{
    this.setState({
      taskType:v
    })
    // 请求接口
    let payload = this.state.overTimePayload;
    payload.serviceType=v[0]==='0'?'':v[0];
    this.props.overTimeTask( payload );
    // 选择后关闭弹窗
    this.setState({
      showMenu: false
    })
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task) && !_.isEmpty(nextProps.task.overTimeTaskList)){
        this.setState({
          overTimeTaskList:nextProps.task.overTimeTaskList.recordList
        })
      }else{
        this.setState({
          overTimeTaskList:[]
        })
      }
    }
  }


  // 计算超时时间
  leftTime=(endTime)=>{
    const end = moment(endTime, dateFormat);
    // 超过时间(秒)
    const leftTime = parseInt((moment().valueOf()-end)/1000)
    return `${parseInt(leftTime/86400)}天 ${parseInt(leftTime%86400/3600)}小时 ${parseInt(leftTime%86400%3600/60)}分钟`
  }

  render(){
    const { 
      overTimeTaskList,
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
      <div className='r-overTimeTask'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='已超时任务' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='navBar' style={{zIndex:100}} >
          <NavBar
            rightContent={<Icon type={showMenu?'up':'down'} />}
            leftContent={navbarText[parseInt(taskType[0])]}
            mode="light"
            onClick={this.handleClick}
          >
            任务类型
          </NavBar>
          {showMenu?menu:null}
        </div>
        <div className='overTimeTask-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(overTimeTaskList)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无已超时任务</div>
              </div>
              :
              overTimeTaskList.map((e,index)=>((
                <List key={index}>
                  <Link
                    to={
                      (e._WorkItem_Instance.serviceType==='4' || e._WorkItem_Instance.serviceType==='5')?
                      `/processingreportdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`:
                      `/processingtaskdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`
                    }
                  >
                    <Item className='list-item' style={{marginBottom:10}}>
                      <div style={{ borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}}>
                        <div style={{fontSize:'15px', color:'#333', lineHeight:'34px', fontWeight:500}} >
                          <img src={(e._WorkItem_Instance.serviceType==='4' || e._WorkItem_Instance.serviceType==='5')?iconReport:iconTask} alt='' width={10} height={10} style={{marginRight:6}} />
                          {e.serviceTypeName}
                        </div>
                        <div 
                          onTouchEnd={ (event)=>this.handleModal(true, e, event)}
                          style={{
                            width:112,height:28, marginTop:3, lineHeight:'28px',
                            textAlign:'center', fontSize:'12px',color:'#FF7A6A',
                          }}
                        >
                          {this.leftTime(e._WorkItem_Instance.remindDate)}
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
                    </Item>
                  </Link>
                </List>
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
            title='退回任务'
            footer={[
              { text: '关闭', onPress: () => this.handleModal(false,{}) },
              { text: '退回', onPress: () => { this.handleSubmit(taskRecord._WorkItem_Instance.id, !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000'); } },
            ]}
          >
            <div style={{height:'80%'}}>
              任务名称: {taskRecord.serviceTypeName}
            </div>
          </Modal>:null
        }  
      </div>
    )
  }
}

export default OverTimeTask;