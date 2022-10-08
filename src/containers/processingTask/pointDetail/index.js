import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { Modal, List, Button, Toast } from 'antd-mobile';
import Head from '../../../components/head';
import history from '@/history';
import { pointDeviceList, saveDeviceInfo, getGridList, clearGridList, clearPointDeviceList, scanPoint } from '@/redux/task/task.action';
import iconScan from '@/assets/img/iconScan.svg';
import { redirectTo } from '@/redux/user/user.action';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '../../../components/form';
import './index.css';

const Item = List.Item;
@connect(
  state=>({task:state.task}),
  { pointDeviceList, saveDeviceInfo, redirectTo, getGridList, clearGridList, clearPointDeviceList, scanPoint }
)
@withRouter
@form
class PointDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      pointDeviceList:[],
      taskRecord: {},                           // 任务详情
      taskInfoVisible: false,                   // 任务详情弹窗
      gridList:[],
      isGetGridList: false,             // 是否已经获取过设备网格列表
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }
  componentWillMount(){
    this.props.clearPointDeviceList();
    this.props.clearGridList();
  }
  componentDidMount(){
    // this.props.getGridList(this.props.match.params.gridID, 0);
    const payload={
      t_CommonSubMissionInst:{
        workRouteID: this.props.match.params.lineId,
        workPointID: this.props.match.params.pointId,
        missionInstID: this.props.match.params.missionId,
      }
    }

    // 获取未领取点位下的设备列表
    this.props.pointDeviceList(payload);
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
  handleGoNextPage(data) {
    data.location = this.getGridListData(data.position)
    this.props.saveDeviceInfo(data)
    // this.props.history.push(key);
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
        if(!_.isEmpty(nextProps.task.pointDeviceList)){
          this.setState({
            pointDeviceList:nextProps.task.pointDeviceList.list
          })
          if(!this.state.isGetGridList){
            nextProps.task.pointDeviceList.list.map((e,index)=>{
              this.props.getGridList(e.position,index)
            })
            this.setState({
              isGetGridList:true
            })
          }
        }else{
          this.setState({
            pointDeviceList:[]
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

  // // 扫描二维码
  // openLabrary(_this){
  //   // eslint-disable-next-line no-undef
  //   cordova.plugins.barcodeScanner.scan(
  //     function (result) {
  //       console.log(
  //         "扫描成功\n" +
  //         "Result: " + result.text + "\n" +
  //         "Format: " + result.format + "\n" +
  //         "Cancelled: " + result.cancelled
  //       );
  //       _this.props.scanPoint({pointId: _this.props.match.params.pointId, qrCodeId:result.cancelled })
  //     },
  //     function (error) {
  //       Toast.info("扫描失败",1.2);
  //       console.log('失败原因  :  ' + error)
  //     },
  //     {
  //       preferFrontCamera : false, // iOS and Android
  //       showFlipCameraButton : false, // iOS and Android
  //       showTorchButton : false, // iOS and Android
  //       torchOn: false, // Android, launch with the torch switched on (if available)
  //       saveHistory: true, // Android, save scan history (default false)
  //       prompt : "请对准二维码扫描", // Android
  //       resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
  //       formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
  //       orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
  //       disableAnimations : true, // iOS
  //       disableSuccessBeep: false // iOS and Android
  //     }
  //   )
  // }

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
      pointDeviceList,
      taskInfoVisible,
      taskRecord,
      gridList,
    } = this.state;

    console.log(gridList)
    return (
      <div className='r-pointDetail'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='任务对象' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='pointDetail-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(pointDeviceList)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无设备</div>
              </div>
              :
              pointDeviceList.map((e,index)=>((
                <Link
                  key={`link${index}`}
                  to={`/deviceinfo/${this.props.match.params.lineId}/${this.props.match.params.pointId}/${this.props.match.params.missionId}/${this.props.match.params.workInsId}/${this.props.match.params.serviceType}/${this.props.match.params.gridID}`}
                >
                  <List key={index}
                    onClick={
                      ()=>this.handleGoNextPage( e )
                    }
                  >
                    <Item className='list-item' arrow='horizontal' style={{marginBottom:10}}>
                      <div style={{display: 'flex', justifyContent:'space-between', borderBottom:'1px solid #ccc'}}>
                        <div style={{width:'calc(100% - 90px)', lineHeight:'32px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                          设备名称: {e.name}
                        </div>
                        <div 
                          style={{ 
                            fontSize:'12px', padding:'0 3px', lineHeight:'26px', margin:'4px 0', width:70, textAlign:'center', display:'inline-block', borderRadius:'4px',
                            background:e.handleResult==='1'?'#FFB1B4':e.handleResult==='2'?'#B8F4D3':e.handleResult==='3'?'#ccc':e.handleResult==='4'?'#FFF2EA':'rgba(0,0,0,0)',
                            color:e.handleResult==='1'?'#E51C24':e.handleResult==='2'?'#00B853':e.handleResult==='3'?'#666':e.handleResult==='4'?'#FC892F':'#aaa'
                          }}
                        >
                          {e.handleResult==='1'?'信息未提交':e.handleResult==='2'?'信息已提交':e.handleResult==='3'?'任务终止':e.handleResult==='4'?'信息已保存':''}
                        </div>
                      </div>
                      <div style={{color:'#666', fontSize:'14px', marginTop:4}}>
                        网格位置 :&nbsp;&nbsp;&nbsp;{this.getGridListData(e.position).join('/')}
                      </div>
                    </Item>
                  </List>
                </Link>
              )))
            }
          </div>
        </div>
        {/* <Button type='ghost' style={{width:'calc(100% - 30px)', position:'absolute', bottom:15, left:15}} onClick={()=>this.openLabrary(this)} >
          <img style={{verticalAlign:'sub', marginRight:10}} src={iconScan} width={26} height={26} alt='scan' />扫一扫
        </Button> */}
        {taskInfoVisible?
          <Modal
            maskClosable
            transparent
            closable
            visible={taskInfoVisible}
            onClose={()=>this.handleModal(false,{})}
            title={taskRecord.serviceTypeName}
            footer={[
              { text: '关闭', onPress: () => this.handleModal(false,{}) },
              { text: '退回', onPress: () => { this.handleSubmit(taskRecord._WorkItem_Instance.id, !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000'); } },
            ]}
          >
            <div style={{height:'80%'}}>
              开始时间: {taskRecord.processStartedDateTime}
            </div>
          </Modal>:null
        }  
      </div>
    )
  }
}

export default PointDetail;