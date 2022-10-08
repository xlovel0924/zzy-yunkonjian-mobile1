import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { List } from 'antd-mobile';
import Head from '../../../components/head';
import history from '@/history';
import { pointList, getGridList, clearGridList } from '@/redux/task/task.action';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '../../../components/form';
import './index.css';

const Item = List.Item;
@connect(
  state=>({task:state.task}),
  { pointList, getGridList, clearGridList }
)
@withRouter
@form
class FinishTaskDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      pointList:[],
      gridList: [],
      isGetAllGrid: false,    // 是否已经获取全部网格(跳转时防止此页面继续请求接口)
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }

  componentWillMount(){
    this.props.clearGridList()
  }
  componentDidMount(){
    const payload={
      t_CommonMissionInst:{
        id: this.props.match.params.missionId,
        type: this.props.match.params.serviceType,
      }
    }
    
    // 获取未领取任务列表
    this.props.pointList(payload);
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

  // 领取任务提交
  handleSubmit=(workItemInstID, nodeInstanceID)=>{
    // this.props.returnTask(workItemInstID, nodeInstanceID);
    this.handleModal(false,{});
    // this.props.processingTask( processingPayload );
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
            if( nextProps.task.gridList.length < nextProps.task.pointList.length && !this.state.isGetAllGrid ){
              this.props.getGridList(e.gridID, index)
            }else{
              this.setState({
                isGetAllGrid: true
              })
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
    const serviceType = this.props.match.params.serviceType;
    return (
      <div className='r-taskDetail'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='点位列表' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='taskDetail-content' ref={this.taskWrapper}>
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
                <Link
                  to={`/finishpointdetail/${e.lineID}/${e.pointID}/${this.props.match.params.missionId}/${this.props.match.params.workInsId}/${this.props.match.params.serviceType}/${e.gridID}`}
                  key={`link${index}`}
                >
                  <List key={index} 
                    // onClick={ ()=>this.handleGoNextPage(`pointdetail/${e.lineID}/${e.pointID}/${this.props.match.params.missionId}`) }
                  >
                    <Item className='list-item' arrow='horizontal' style={{marginBottom:10}}>
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
                </Link>
              )))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default FinishTaskDetail;