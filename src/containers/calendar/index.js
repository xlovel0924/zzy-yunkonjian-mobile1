import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { List, Icon } from 'antd-mobile';
import moment from 'moment';
import Head from '@/components/head';
import history from '@/history';
import { pointList, getGridList, clearGridList, processingTask } from '@/redux/task/task.action';
import CheckCalendar from '@/components/CheckCalendarPreview';
import noalarm from '@/assets/img/noAlarm.svg';
import iconClock from '@/assets/img/iconClock.svg';
import form from '@/components/form';
import './index.css';

const dateFormat = 'YYYY-MM-DD'
let weekAllDays = [ '日', '一', '二', '三', '四', '五', '六' ];
const taskType = [
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
    label: '设备运行',
  },
  {
    value: '4',
    label: '事件上报',
  },
  {
    value: '5',
    label: '设备报修',
  },
];
const Item = List.Item;
@connect(
  state=>({task:state.task}),
  { pointList, getGridList, clearGridList, processingTask }
)
@withRouter
@form
class Calendar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      today: moment().format(dateFormat),
      processingTaskList: [],     // 待领取任务列表
      selectedDay:'',             // 选择的天
      days: [],          // 本周日期数组
      showMonth: false,     // 显示月或周   false:周  true:月
      startDay: moment(),      // 月日历用,取星期的第一天的那个月
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }
  // componentWillMount(){
  //   this.props.clearGridList()
  // }
  componentDidMount(){
    this.initDays(moment())
    const processingPayload = {
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
      "toDrawNodeID": ""
    }
    // 获取待执行任务列表
    this.props.processingTask(processingPayload);
    // this.initScroll();
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
    // console.log(this.alarmDetailScroll);
  }

  initDays=(selectedDay)=>{
    // 获取本周信息
    const week = moment(selectedDay).format('dddd')
    this.setState({
      selectedDay: moment(selectedDay).format(dateFormat)
    })
    if(week==='Sunday'){
      this.setState({
        days: [
          moment(selectedDay).format(dateFormat),
          moment(selectedDay).subtract(-1,'days').format(dateFormat),
          moment(selectedDay).subtract(-2,'days').format(dateFormat),
          moment(selectedDay).subtract(-3,'days').format(dateFormat),
          moment(selectedDay).subtract(-4,'days').format(dateFormat),
          moment(selectedDay).subtract(-5,'days').format(dateFormat),
          moment(selectedDay).subtract(-6,'days').format(dateFormat)
        ],
        // startDay:moment(selectedDay).format(dateFormat),
      })
    }else if(week==='Monday'){
      this.setState({
        days: [
          moment(selectedDay).subtract(1,'days').format(dateFormat),
          moment(selectedDay).format(dateFormat),
          moment(selectedDay).subtract(-1,'days').format(dateFormat),
          moment(selectedDay).subtract(-2,'days').format(dateFormat),
          moment(selectedDay).subtract(-3,'days').format(dateFormat),
          moment(selectedDay).subtract(-4,'days').format(dateFormat),
          moment(selectedDay).subtract(-5,'days').format(dateFormat)
        ],
        // startDay:moment(selectedDay).subtract(1,'days').format(dateFormat),
      })
    }
    else if(week==='Tuesday'){
      this.setState({
        days: [
          moment(selectedDay).subtract(2,'days').format(dateFormat),
          moment(selectedDay).subtract(1,'days').format(dateFormat),
          moment(selectedDay).format(dateFormat),
          moment(selectedDay).subtract(-1,'days').format(dateFormat),
          moment(selectedDay).subtract(-2,'days').format(dateFormat),
          moment(selectedDay).subtract(-3,'days').format(dateFormat),
          moment(selectedDay).subtract(-4,'days').format(dateFormat),
      ],
      // startDay: moment(selectedDay).subtract(2,'days').format(dateFormat),
    })
    }
    else if(week==='Wednesday'){
      this.setState({
        days: [
          moment(selectedDay).subtract(3,'days').format(dateFormat),
          moment(selectedDay).subtract(2,'days').format(dateFormat),
          moment(selectedDay).subtract(1,'days').format(dateFormat),
          moment(selectedDay).format(dateFormat),
          moment(selectedDay).subtract(-1,'days').format(dateFormat),
          moment(selectedDay).subtract(-2,'days').format(dateFormat),
          moment(selectedDay).subtract(-3,'days').format(dateFormat),
        ],
        // startDay: moment(selectedDay).subtract(3,'days').format(dateFormat),
      })
    }
    else if(week==='Thursday'){
      this.setState({
        days: [
          moment(selectedDay).subtract(4,'days').format(dateFormat),
          moment(selectedDay).subtract(3,'days').format(dateFormat),
          moment(selectedDay).subtract(2,'days').format(dateFormat),
          moment(selectedDay).subtract(1,'days').format(dateFormat),
          moment(selectedDay).format(dateFormat),
          moment(selectedDay).subtract(-1,'days').format(dateFormat),
          moment(selectedDay).subtract(-2,'days').format(dateFormat),
        ],
        // startDay: moment(selectedDay).subtract(4,'days').format(dateFormat),
      })
    }
    else if(week==='Friday'){
      this.setState({
        days: [
          moment(selectedDay).subtract(5,'days').format(dateFormat),
          moment(selectedDay).subtract(4,'days').format(dateFormat),
          moment(selectedDay).subtract(3,'days').format(dateFormat),
          moment(selectedDay).subtract(2,'days').format(dateFormat),
          moment(selectedDay).subtract(1,'days').format(dateFormat),
          moment(selectedDay).format(dateFormat),
          moment(selectedDay).subtract(-1,'days').format(dateFormat),
        ],
        // startDay: moment(selectedDay).subtract(5,'days').format(dateFormat),
      })
    }
    else if(week==='Saturday'){
      this.setState({
        days: [
          moment(selectedDay).subtract(6,'days').format(dateFormat),
          moment(selectedDay).subtract(5,'days').format(dateFormat),
          moment(selectedDay).subtract(4,'days').format(dateFormat),
          moment(selectedDay).subtract(3,'days').format(dateFormat),
          moment(selectedDay).subtract(2,'days').format(dateFormat),
          moment(selectedDay).subtract(1,'days').format(dateFormat),
          moment(selectedDay).format(dateFormat),
        ],
        // startDay: moment(selectedDay).subtract(6,'days').format(dateFormat),
      })
    }
  }

  handleBack() {
    history.goBack();
  }

  // 跳转页面
  handleGoNextPage(key) {
    this.props.history.push(key);
  };

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task) && !_.isEmpty(nextProps.task.processingTaskList)){
        this.setState({
          processingTaskList:nextProps.task.processingTaskList.recordList
        })
      }else{
        this.setState({
          processingTaskList:[]
        })
      }
    }
  }

  // 点击天
  handleDayClick=(v)=>{
    console.log('点击天   天天天天天天天天天天天天天天天天天天天天天天天天天')
    console.log(v)
    this.setState({
      selectedDay:v
    })
  }

  // 上一周
  handleLastWeek=()=>{
    const { days } = this.state;
    let tempDays = [
      moment(days[0],dateFormat).subtract(7,'days').format(dateFormat),
      moment(days[1],dateFormat).subtract(7,'days').format(dateFormat),
      moment(days[2],dateFormat).subtract(7,'days').format(dateFormat),
      moment(days[3],dateFormat).subtract(7,'days').format(dateFormat),
      moment(days[4],dateFormat).subtract(7,'days').format(dateFormat),
      moment(days[5],dateFormat).subtract(7,'days').format(dateFormat),
      moment(days[6],dateFormat).subtract(7,'days').format(dateFormat),
    ]
    this.setState({
      days:tempDays
    })
  }

  // 下一周
  handleNextWeek=()=>{
    const { days } = this.state;
    let tempDays = [
      moment(days[0],dateFormat).subtract(-7,'days').format(dateFormat),
      moment(days[1],dateFormat).subtract(-7,'days').format(dateFormat),
      moment(days[2],dateFormat).subtract(-7,'days').format(dateFormat),
      moment(days[3],dateFormat).subtract(-7,'days').format(dateFormat),
      moment(days[4],dateFormat).subtract(-7,'days').format(dateFormat),
      moment(days[5],dateFormat).subtract(-7,'days').format(dateFormat),
      moment(days[6],dateFormat).subtract(-7,'days').format(dateFormat),
    ]
    this.setState({
      days:tempDays
    })
  }

  // 切换周,月
  handleShowMonth=()=>{
    this.setState({
      showMonth: !this.state.showMonth
    })
  }

  // 上一月
  handleLastMonth=()=>{
    this.setState({
      startDay: moment(this.state.startDay).subtract(1,'months').format(dateFormat)
    });
    this.child.initMonth(moment(this.state.startDay).subtract(1,'months').format(dateFormat))
  }

  // 下一月
  handleNextMonth=()=>{
    this.setState({
      startDay: moment(this.state.startDay).subtract(-1,'months').format(dateFormat)
    })
    this.child.initMonth(moment(this.state.startDay).subtract(-1,'months').format(dateFormat));
  };

  // 调用子组件方法
  onRef=(ref)=>{
    this.child = ref
  };

  render(){
    const {
      today,
      selectedDay,       // 选择的日期(默认选中今天)
      days,     // 本周第一天日期
      processingTaskList,
      showMonth,
      startDay,
    } = this.state;
    console.log('selectedDay000000000000000')
    console.log(selectedDay)
    // const serviceType = this.props.match.params.serviceType;
    return (
      <div className='r-calendar'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='日历' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='weekContent'>
          {showMonth?
            <div className='arrowBtn'
              onClick={this.handleLastMonth}
            >
              <Icon type='left' style={{color:'#0088FE', verticalAlign:'sub'}} />
            </div>:
            <div className='arrowBtn'
              onClick={this.handleLastWeek}
            >
              <Icon type='left' style={{color:'#0088FE', verticalAlign:'sub'}} />
            </div>
          }
          <div className='week'>
            <div className='weekBox'>
              {showMonth?
                <CheckCalendar selectedDay={selectedDay} handleDayClick={this.handleDayClick} startDay={startDay} onRef={this.onRef}/>:
                weekAllDays.map((e,index)=>(
                  <div key={index} className='weekItem'>
                    <div className='weekItemTop'>
                      {e}
                    </div>
                    <div
                      className='weekItemBottom'
                      onClick={()=>this.handleDayClick(days[index])}
                      style={{background:moment(days[index]).format('YYYY-MM-DD')===selectedDay?'#0088FE':'#fff',
                        color:moment(days[index]).format('YYYY-MM-DD')===selectedDay?'#fff':'#333'
                      }}
                    >
                      <span
                        style={
                          days[index]===today?{color:'#f34', fontWeight:600}:{}
                        }
                      >
                        {moment(days[index], dateFormat).format('DD')}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
            <div style={{textAlign:'center', width:'100%'}} onClick={this.handleShowMonth}>
              <Icon type={showMonth?'up':'down'} style={{color:'#bbb'}} />
            </div>
          </div>
          
          {showMonth?
            <div className='arrowBtn'
              onClick={this.handleNextMonth}
            >
              <Icon type='right' style={{color:'#0088FE', verticalAlign:'sub'}} />
            </div>:
            <div className='arrowBtn'
              onClick={this.handleNextWeek}
            >
              <Icon type='right' style={{color:'#0088FE', verticalAlign:'sub'}} />
            </div>
          }
        </div>
        <div className='calendar-content' ref={this.taskWrapper}>
          <div>
            <div className='todayTask'>
              <div style={{fontSize:'14px', fontWeight:600, color:'#333', paddingTop:10, width:50}}>
                {moment(selectedDay, dateFormat).format('DD')}日
              </div>
              <div className='taskList'>
                {
                  _.isEmpty(processingTaskList)?
                  null
                  :
                  processingTaskList.map((e,index)=>((
                    moment(e.processStartedDateTime, dateFormat).format('YYYY-MM-DD')===moment(selectedDay, dateFormat).format('YYYY-MM-DD')?
                      <List key={index}>
                        <Link
                          to={
                            (e._WorkItem_Instance.serviceType==='4' || e._WorkItem_Instance.serviceType==='5')?
                            `/processingreportdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`:
                            `/processingtaskdetail/${e._WorkItem_Instance.serviceInstID}/${e._WorkItem_Instance.id}/${e._WorkItem_Instance.serviceType}`
                          }
                        >
                          <Item className='list-item'>
                            <div style={{ display:'flex', justifyContent:'left'}}>
                              <div style={{width:8, height:8, borderRadius:'50%', backgroundColor:'#9c9c9c', marginTop:13, marginRight:8}} />
                              <div style={{fontSize:'14px', color:'#333', lineHeight:'34px'}} >
                                {taskType[parseInt(e._WorkItem_Instance.serviceType)].label}
                              </div>
                            </div>
                            
                            <div style={{display:'flex', justifyContent:'left'}}>
                              <div style={{margin:'-4px 6px 0 16px'}}>
                                <img src={iconClock} alt='time' width={12} height={12} />
                              </div>
                              <div style={{color:'#999', fontSize:'11px'}}>{moment(e.processStartedDateTime, dateFormat).format('MM-DD HH:mm')}&nbsp;-&nbsp;</div>
                              <div style={{color:'#999', fontSize:'11px'}}>{moment(e._WorkItem_Instance.remindDate, dateFormat).format('MM-DD HH:mm')}</div>
                            </div>
                          </Item>
                        </Link>
                      </List>
                    :null
                  )))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar;