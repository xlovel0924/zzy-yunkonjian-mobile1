import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link } from 'react-router-dom';
import { Button, Switch, Toast, InputItem, Icon } from 'antd-mobile';
import Head from '../../../components/head';
import { pointListReport, saveDeviceInfo, doSBXJ, doSBBY, doSBYX, saveSBXJ, saveSBBY, saveSBYX, getTask, getGridList, clearGridList } from '@/redux/task/task.action';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '../../../components/form';
import './index.css';

// 事件上报, 设备报修详情页面
@connect(
  state=>({task:state.task}),
  { pointListReport, saveDeviceInfo, doSBXJ, doSBBY, doSBYX, saveSBXJ, saveSBBY, saveSBYX, getTask, getGridList, clearGridList }
)
@withRouter
@form
class ProcessingReportDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      deviceInfo:{},
      workStandard: {},                           // 作业标准
      taskInfoVisible: false,                   // 任务详情弹窗
      handleResult:'1',             // 任务完成情况 1未完成, 2已完成用于判断提交按钮是否可点
      viewWidth: 0,
      gridList: [],               // 网格位置
      pictureVisible: false,
      picData: '',   
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }
  componentWillMount(){
    this.props.clearGridList()
  }
  componentDidMount(){
    this.setState({
      viewWidth : document.querySelector('body').offsetWidth,
    })
    this.initScroll();
    const payload = {
      id: this.props.match.params.missionId,
      type: this.props.match.params.serviceType,
    }
    this.props.pointListReport(payload)
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
    // console.log(this.alarmDetailScroll);
  }

  handleBack =()=> {
    this.props.saveDeviceInfo({});
    this.props.history.goBack();
  }

   // 领取任务提交
   handleSubmit=()=>{
    // this.props.getTask(this.props.match.params.workInsId, JSON.parse(localStorage.getItem('user')).key, {});
    setTimeout(() => {
      this.handleBack();
    }, 700);
  }
  

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task)){
        if(!_.isEmpty(nextProps.task.deviceInfo)){
          this.setState({
            deviceInfo: nextProps.task.deviceInfo,
          })
          if(_.isEmpty(this.state.gridList) && !_.isEmpty(nextProps.task.deviceInfo.location)){
            this.props.getGridList(nextProps.task.deviceInfo.location, 0)
          }
        }else{
          this.setState({
            deviceInfo:{}
          })
        }
        if(!_.isEmpty(nextProps.task.gridList) && _.isEmpty(this.state.gridList)){
          this.setState({
            gridList: nextProps.task.gridList
          })
        }
      }
    }
  }

  // 预览图片
  handleShowPicture = (flag, picData) =>{
    this.setState({
      picData: picData,
      pictureVisible: flag
    })
  }

  render(){
    const {
      viewWidth,
      deviceInfo,
      gridList,
      pictureVisible,
      picData,
    } = this.state;
    
    return (
      <div className='r-reportInfo'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title={this.props.match.params.serviceType==='4'?'事件详情':'报修详情'} handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='reportInfo-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(deviceInfo)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无设备信息</div>
              </div>
              :
              <div style={{padding:'15px'}}>
                <div style={{ fontWeight:600, marginBottom:10, color:'#555' }}>
                  设备信息:
                </div>
                <div style={{ fontSize:'14px', marginBottom:20 }}>
                  <div style={{marginBottom:6}}><span style={{ color:'#888' }}>设备名称:&nbsp;&nbsp;</span> {!_.isEmpty(deviceInfo.para3)?deviceInfo.para3:'-'}</div>
                  <div style={{marginBottom:6}}><span style={{ color:'#888' }}>
                    网格位置:&nbsp;&nbsp;
                    </span> {!_.isEmpty(gridList)?gridList[0].list.join('/'):' -'}
                  </div>
                  <div><span style={{ color:'#888' }}>详细位置:&nbsp;&nbsp;</span> {deviceInfo.para1}</div>
                </div>
                <div style={{ fontWeight:600, marginBottom:10, color:'#555' }}>
                  录音信息:
                </div>
                <audio src={JSON.parse(deviceInfo.processItem1).audioUrl} controls='controls' style={{marginBottom:16, width:'100%'}} >
                  您的浏览器不支持 audio 标签。
                </audio>
                <div style={{ fontWeight:600, marginBottom:10, color:'#555' }}>
                  照片信息:
                </div>
                <div className='pictureContent'>
                  {_.isEmpty(JSON.parse(deviceInfo.processItem1).pictureList)?null:
                    JSON.parse(deviceInfo.processItem1).pictureList.map((e,index)=>(
                      <div
                        key={index}
                        className='pictureBox' 
                        style={{ marginRight:(viewWidth-270)/3 }}
                        onClick={()=>this.handleShowPicture(true, e)}
                      >
                        <img height={58} width={58} src={e} alt=""/>
                      </div>
                    ))
                  }
                </div>
                <div style={{ fontWeight:600, marginBottom:10, marginTop:6, color:'#555' }}>
                  说明信息:
                </div>
                <div 
                  style={!_.isEmpty(deviceInfo.para2)?{
                    width:'calc(100% - 20px)', borderRadius:'5px', lineHeight:'26px', padding:'5px 10px', maxHeight:'130px',
                    overflow:'hidden', textOverflow:'ellipsis', 
                  }:{width:'calc(100% - 20px)', border:'1px solid #ccc', borderRadius:'5px', lineHeight:'26px', padding:'5px 10px', maxHeight:'130px',
                    overflow:'hidden', textOverflow:'ellipsis', textAlign:'center'
                  }
                }
                >
                  <span style={_.isEmpty(deviceInfo.para2)?{color:'#ccc'}:{}}>
                    {!_.isEmpty(deviceInfo.para2)?deviceInfo.para2:'暂无说明信息'}
                  </span>
                </div>
              </div>
            }
          </div>
          <div style={{width:'calc(100% - 30px)',marginLeft:15,  position:'absolute', bottom:20}}>
            <Link
              to={`/doreporttask/${this.props.match.params.missionId}/${this.props.match.params.workInsId}/${this.props.match.params.serviceType}`}
            >
              <Button style={{width:'100%'}} type='primary' >执行任务</Button>
            </Link>
          </div>
        </div>
        {/* 显示照片 */}
        <div className='showPicture' style={{display:pictureVisible?'block':'none'}}>
          <div className='showPictureContent'>
            <div style={{position:'absolute', top:0, right:0}}>
              <Icon style={{color:'#fff'}} size='lg' type='cross' onClick={()=>this.handleShowPicture(false, '')}/>
            </div>
            <img src={picData} alt='pic' />
          </div>
        </div>
      </div>
    )
  }
}

export default ProcessingReportDetail;