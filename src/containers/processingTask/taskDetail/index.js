import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { List, Toast } from 'antd-mobile';
import Head from '../../../components/head';
import history from '@/history';
import { pointList, getGridList, clearGridList, scanPoint } from '@/redux/task/task.action';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '../../../components/form';
import './index.css';

const Item = List.Item;
@connect(
  state=>({task:state.task}),
  { pointList, getGridList, clearGridList, scanPoint }
)
@withRouter
@form
class TaskDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      pointList:[],
      gridList: [],
      isGetAllGrid: false,    // 是否已经获取全部网格(跳转时防止此页面请求接口)
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
        type: this.props.match.params.serviceType
      }
    }
    
    // 获取点位列表
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

  // 扫描点位二维码
  // {`/pointdetail/${e.lineID}/${e.pointID}/${this.props.match.params.missionId}/${this.props.match.params.workInsId}/${this.props.match.params.serviceType}/${e.gridID}`}
  openLabrary=(_this, lineID, pointID, missionId, workInsId, serviceType, gridID)=>{
    // eslint-disable-next-line no-undef
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        // console.log(
        //   "扫描成功\n" +
        //   "Result: " + result.text + "\n" +
        //   "Format: " + result.format + "\n" +
        //   "Cancelled: " + result.cancelled
        // );
        if(Array.isArray(JSON.parse(result.text))){
          _this.props.scanPoint({
            qrCodeId: JSON.parse(result.text)[0],
            lineID: lineID,
            pointID: pointID,
            missionId: missionId,
            workInsId: workInsId,
            serviceType: serviceType,
            gridID: gridID,
            props: _this.props
          })
        }
      },
      function (error) {
        Toast.info("扫描失败",1.2);
        // console.log('失败原因  :  ' + error)
      },
      {
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : false, // iOS and Android
        showTorchButton : false, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt : "请对准二维码扫描", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: false // iOS and Android
      }
    )
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
                // <Link
                //   to={`/pointdetail/${e.lineID}/${e.pointID}/${this.props.match.params.missionId}/${this.props.match.params.workInsId}/${this.props.match.params.serviceType}/${e.gridID}`}
                //   key={`link${index}`}
                // >
                  <List key={index} 
                    onClick={ ()=>this.openLabrary(this, e.lineID, e.pointID, this.props.match.params.missionId, this.props.match.params.workInsId, this.props.match.params.serviceType, e.gridID)}
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
                // </Link>
              )))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default TaskDetail;