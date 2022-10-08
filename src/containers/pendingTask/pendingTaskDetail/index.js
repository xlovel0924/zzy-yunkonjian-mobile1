import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { List, Button } from 'antd-mobile';
import Head from '../../../components/head';
import history from '@/history';
import { pointList, getTaskInDetail, pointListReport, getGridList, clearGridList } from '@/redux/task/task.action';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '../../../components/form';
import './index.css';

const Item = List.Item;
@connect(
  state=>({task:state.task}),
  { pointList, getTaskInDetail, pointListReport, getGridList, clearGridList }
)
@withRouter
@form
class PendingTaskDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      pointList:[],
      gridList:[],
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }

  componentWillMount(){
    this.props.clearGridList()
  }
  componentDidMount(){
    if( this.props.match.params.serviceType==='4' || this.props.match.params.serviceType==='5' ){
      const payload={
        id: this.props.match.params.missionId,
        type: this.props.match.params.serviceType,
      }
      // 获取任务点位列表
      this.props.pointListReport(payload)
    }else{
      const payload={
        t_CommonMissionInst:{
          id: this.props.match.params.missionId,
          type: this.props.match.params.serviceType,
        }
      }
      // 获取任务点位列表
      this.props.pointList(payload);
    }
    this.initScroll();
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
    // console.log(this.alarmDetailScroll);
  }

  handleBack=()=> {
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

  // 领取任务提交
  handleSubmit=()=>{
    this.props.getTaskInDetail(this.props.match.params.instanceId, !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',{});
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task)){
        if(!_.isEmpty(nextProps.task.pointList)){
          this.setState({
            pointList:nextProps.task.pointList
          })
          // 获取网格位置列表
          nextProps.task.pointList.map((e,index)=>{
            if( nextProps.task.gridList.length < nextProps.task.pointList.length ){
              this.props.getGridList(e.gridID, index)
            }
          })
        }else{
          this.setState({
            pointList:[]
          })
        }
        if(!_.isEmpty(nextProps.task.gridList)){
          this.setState({
            gridList: nextProps.task.gridList
          })
        }
      }
    }
  }

  // 获取网格数据
  getGridListData = (id) =>{
    const { gridList } = this.state;
    if(_.isEmpty(gridList)){
      return ['-']
    }else{
      let listData = ['-'];
      gridList.map(e=>{
        if(e.id === id){
          listData=e.list
        }
      })
      return listData
    }
  }

  render(){
    const { 
      pointList,
      gridList,
    } = this.state;
    console.log(gridList)
    
    const serviceType = this.props.match.params.serviceType;
    return (
      <div className='r-pendingTaskDetail'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='点位列表' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='pendingTaskDetail-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(pointList)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无作业点</div>
              </div>
              :
              pointList.map((e,index)=>((
                <List key={index} >
                  <Item className='list-item' style={{marginBottom:10}}>
                    <div style={{display: 'flex', justifyContent:'space-between', borderBottom:'1px solid #ccc', marginBottom:8}}>
                      <div style={{width:'calc(100% - 90px)', lineHeight:'32px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                        {e.pointName}
                      </div>
                      <div style={{ fontSize:'12px', padding:'0 5px', lineHeight:'26px', color:'#FF7C00', margin:'4px 0', textAlign:'center', background:'#FFD5AD', borderRadius:'4px'}}>
                        {serviceType==='1'?'设备巡检点':serviceType==='2'?'设备保养点':serviceType==='3'?'设备运行点':serviceType==='4'?'事件上报点':''}
                      </div>
                    </div>
                    <div style={{fontSize:'12px', color:'#666', marginBottom:5}}>
                      网格位置 :&nbsp;&nbsp;&nbsp;{this.getGridListData(e.gridID).join('/')}
                    </div>
                    {/* <div style={{fontSize:'14px'}}>
                      设备数量: 10/15
                    </div> */}
                  </Item>
                </List>
              )))
            }
          </div>
        </div>
        <Button type='primary' onClick={this.handleSubmit} style={{position:'absolute', bottom:20, width:'calc(100% - 30px)', marginLeft:15}}>
          领取任务
        </Button>
      </div>
    )
  }
}

export default PendingTaskDetail;