import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import moment from 'moment';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { List, Menu, NavBar, Icon } from 'antd-mobile';
import Head from './../../components/head';
import history from '@/history';
import { finishTask } from '@/redux/task/task.action';
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
  { finishTask }
)
@withRouter
@form
class ProcessingTask extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      finishTaskList:[],
      taskRecord: {},                           // 任务详情
      taskInfoVisible: false,                   // 任务详情弹窗
      taskType:['0'],                         // 0所有任务 1巡检任务 2保养任务 3设备运行任务 4事件上报 5设备报修
      showMenu: false,                // 下拉菜单开关
      finishPayload:{},
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }

  componentDidMount(){
    // 已完成任务入参
    const finishPayload={
      "drawNodeID": "",
      "drawState": "",
      "handleNodeID": !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
      "pageIndex": "1",
      "receiveNodeID": "",
      "searchPara1": "1",
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
    };
    this.setState({
      finishPayload:finishPayload
    })
    // 获取已完成务列表
    this.props.finishTask( finishPayload );
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
  handleModal=(flag, record)=>{
    this.setState({
      taskInfoVisible: flag,
      taskRecord: record
    })
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task) && !_.isEmpty(nextProps.task.finishTaskList)){
        this.setState({
          finishTaskList:nextProps.task.finishTaskList.recordList
        })
      }else{
        this.setState({
          finishTaskList:[]
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
    const {finishPayload} = this.state;
    this.setState({
      taskType:v
    })
    // 请求接口
    let payload = finishPayload;
    payload.serviceType=v[0]==='0'?'':v[0];
    this.props.finishTask( payload );
  }

  render(){
    const { 
      finishTaskList,
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
      <div className='r-finishTask'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='已完成任务' handleBack={this.handleBack} hasShadow={true}></Head>
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
        <div className='finishTask-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(finishTaskList)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无已完成任务</div>
              </div>
              :
              finishTaskList.map((e,index)=>((
                <List key={index}>
                  <Link
                    to={
                      (e._WorkItem_Instance.serviceType==='4' || e._WorkItem_Instance.serviceType==='5')?
                      `/finishreportdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`:
                      `/finishtaskdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`
                    }
                  >
                    <Item className='list-item' style={{marginBottom:10}}>
                      <div style={{ borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}}>
                        <div style={{fontSize:'15px', color:'#333', lineHeight:'34px', fontWeight:500}} >
                          <img src={(e._WorkItem_Instance.serviceType==='4' || e._WorkItem_Instance.serviceType==='5')?iconReport:iconTask} alt='' width={10} height={10} style={{marginRight:6}} />
                          {e.serviceTypeName}
                        </div>
                        <div
                          style={{
                            width:60,height:24, marginTop:6, lineHeight:'24px', backgroundColor:'#d9d9d9',
                            textAlign:'center', fontSize:'12px', borderRadius:'4px', color:'#8a8a8a'
                          }}
                        >
                          按时完成
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
                        
                      {/* <div style={{fontSize:'12px', color:'#888', margin:'2px 0 0px 0px', display:'flex', justifyContent:'left'}}>
                        <div style={{width:60, color:'#555'}}>剩余时间: </div>
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
                      </div> */}
                    </Item>
                    {/* <Item className='list-item' style={{marginBottom:10}}>
                      <div style={{ borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between'}}>
                        <div style={{fontSize:'18px', color:'#555', lineHeight:'34px', fontWeight:500}} >
                          {e.serviceTypeName}
                        </div>
                        <div style={{background:'#8c7', fontSize:'14px', padding:'0 5px', lineHeight:'26px', color:'#fff', margin:'4px 0', borderRadius:'4px'}}>
                          {navbarText[parseInt(e._WorkItem_Instance.serviceType)]}
                        </div>
                      </div>

                      <div>
                        <div style={{winth:'100%'}}>
                          <div style={{fontSize:'10px', color:'#888', margin:'2px 0 4px 0px',width:'100%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                            所属计划: {e._WorkItem_Instance.serviceInstName}
                          </div>
                          <div style={{fontSize:'10px', color:'#888', margin:'2px 0 4px 0px'}}>
                            任务开始时间: {e.processStartedDateTime}
                          </div>
                          <div style={{fontSize:'10px', color:'#888', margin:'2px 0 4px 0px', width:'100%', display:'flex', justifyContent:'space-between'}}>
                            <div>计划结束时间: {e._WorkItem_Instance.endTime}</div>
                            <div style={{color:'#aaa'}}>按时完成</div>
                          </div>
                        </div>
                      </div>
                    </Item> */}
                  </Link>
                </List>
              )))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ProcessingTask;