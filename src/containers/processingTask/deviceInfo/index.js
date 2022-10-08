import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link } from 'react-router-dom';
import { Button, Switch, Toast, InputItem, Icon } from 'antd-mobile';
import Head from '../../../components/head';
import { pointDeviceList, saveDeviceInfo, doSBXJ, doSBBY, doSBYX, saveSBXJ, saveSBBY, saveSBYX, saveWillPayload, clearGridList } from '@/redux/task/task.action';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '../../../components/form';
import './index.css';

@connect(
  state=>({task:state.task}),
  { pointDeviceList, saveDeviceInfo, doSBXJ, doSBBY, doSBYX, saveSBXJ, saveSBBY, saveSBYX, saveWillPayload, clearGridList }
)
@withRouter
@form
class DeviceInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      deviceInfo:{},
      workStandard: {},                           // 作业标准
      taskInfoVisible: false,                   // 任务详情弹窗
      handleResult:'1',             // 任务完成情况 1未完成, 2已完成用于判断提交按钮是否可点
      pictureVisible: false,
      picData: '',      
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }
  componentWillMount(){
    this.props.clearGridList()
  }
  componentDidMount(){
    this.initScroll();
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

  // 提交(校验各种标准是否完成)
  handleSubmit=()=>{
    const { workStandard, deviceInfo } = this.state;
    // 任务类型 (巡检1,保养2,设备运行3,事件上报4,设备报修5)
    if(!_.isEmpty(workStandard)){
      let checkedAll = true;
      workStandard.map(e=>{
        if(e.dataType===1){
          if(e.defValue!=='0'){
            checkedAll=false
          }
        }else if(e.dataType===2){
          if(_.isEmpty(e.imageData)){
            checkedAll=false
          }
        }else if(e.dataType===3){
          if(_.isEmpty(e.remark)){
            console.log('3')
            console.log(e.remark)
            checkedAll=false
          }
        }
      })
      // 全部勾选才能提交
      if(checkedAll){
        const payload={
          t_CommonSubMissionInst:{
            workRouteID: this.props.match.params.lineId,
            workPointID: this.props.match.params.pointId,
            missionInstID: this.props.match.params.missionId,
            workItemInstID: this.props.match.params.workInsId,
            id: deviceInfo.id,
            handleResult:'2',
            handlerPersonID: !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
            para1: JSON.stringify(workStandard),
          }
        }
        if(this.props.match.params.serviceType==='1'){
          this.props.doSBXJ(payload, '0'); // 待测试  是否可以在action里面history.goback
        }else if(this.props.match.params.serviceType==='2'){
          this.props.doSBBY(payload, '0');
          this.handleBack();
        }else if(this.props.match.params.serviceType==='3'){
          this.props.doSBYX(payload, '0');
          this.handleBack();
        }
      }else{
        Toast.info('请完成所有作业标准', 1.3)
      }
    }
  }

  // 点击保存按钮
  handleSave=()=>{
    const { workStandard, deviceInfo } = this.state;
    const payload={
      t_CommonSubMissionInst:{
        workRouteID: this.props.match.params.lineId,
        workPointID: this.props.match.params.pointId,
        missionInstID: this.props.match.params.missionId,
        workItemInstID: this.props.match.params.workInsId,
        id: deviceInfo.id,
        handleResult:'1',
        handlerPersonID: !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
        para1: JSON.stringify(workStandard),
      }
    }
    if(this.props.match.params.serviceType==='1'){
      this.props.saveSBXJ(payload);
    }else if(this.props.match.params.serviceType==='2'){
      this.props.saveSBBY(payload);
    }else if(this.props.match.params.serviceType==='3'){
      this.props.saveSBYX(payload);
    }
  }
  

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.task) && !_.isEmpty(nextProps.task.deviceInfo)){
        this.setState({
          deviceInfo: nextProps.task.deviceInfo,
        })
        if(!_.isEmpty(nextProps.task.deviceInfo.para1)){
          this.setState({
            workStandard: JSON.parse(nextProps.task.deviceInfo.para1),
          })
        }
      }else{
        this.setState({
          deviceInfo:{}
        })
      }
    }
  }

  // 布尔型开关点击
  onSwitchChange=(key)=>{
    const { workStandard } = this.state;
    let tempData = [];
    // eslint-disable-next-line
    workStandard.map(e=>{
      if(e.key===key){
        const tempChecked=e.defValue==='0'?'1':'0';
        const element = { ...e, defValue: tempChecked };
        tempData.push(element)
      }else{
        tempData.push(e)
      }
    })
    this.setState({
      workStandard: tempData
    })
  }

  // 文本型输入
  onInputChange=(key, value)=>{
    const { workStandard } = this.state;
    let tempData = [];
    // eslint-disable-next-line
    workStandard.map(e=>{
      if(e.key===key){
        const element = { ...e, remark: value };
        tempData.push(element)
      }else{
        tempData.push(e)
      }
    })
    this.setState({
      workStandard: tempData
    })
  }

  // 打开相机
  imagePicture=(_this, key)=> {
    // console.log('打开相机')
    // console.log(_this);
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50, //图像的保存质量，范围0-100，100是最大值，最高的分辨率，没有任何压缩损失
      // eslint-disable-next-line no-undef
      sourceType: Camera.PictureSourceType.CAMERA,//指定图片来自拍照
      allowEdit: true,  //允许在选择图片之前进行简单的编辑
      correctOrientation: true, // 如果是横向拍摄的照片，会自动旋转到正确的方向
      saveToPhotoAlbum: true, // 备拍照后的图像是否保存的图片库中
      // eslint-disable-next-line no-undef
      destinationType: Camera.DestinationType.DATA_URL // 选择返回值的格式
    });
    function onSuccess(imageData) {
      // 修改para1,把照片信息存入
      const { workStandard } = _this.state;
      let tempData = [];
      // eslint-disable-next-line
      workStandard.map(e=>{
        if(e.key===key){
          const element = { ...e, imageData: "data:image/jpeg;base64," + imageData };
          tempData.push(element)
        }else{
          tempData.push(e)
        }
      })
      _this.setState({
        workStandard: tempData
      })
      // const {pictureList} = _this.state;
      // console.log('成功')
      // console.log(pictureList.length);
      // // console.log(imageData)
      //   // var image = document.getElementById('myImage');
      //   // image.src = "data:image/jpeg;base64," + imageData;
      //   // image.width = 60;
      //   // image.height = 60;
      //   pictureList.push("data:image/jpeg;base64," + imageData);
      //   _this.setState({
      //     pictureList: pictureList,
      //   })
      //   console.log(_this.state);
    }
    function onFail(message) {
        alert('Failed because: ' + message);
    }
  }

  // 保存作业标准信息
  handleExceptionPage=()=>{
    const { workStandard, deviceInfo } = this.state;
    const payload={
      t_CommonSubMissionInst:{
        workRouteID: this.props.match.params.lineId,
        workPointID: this.props.match.params.pointId,
        missionInstID: this.props.match.params.missionId,
        workItemInstID: this.props.match.params.workInsId,
        id: deviceInfo.id,
        handleResult:'2',
        handlerPersonID: !_.isEmpty(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).key:'0000000000000000',
        para1: JSON.stringify(workStandard),
      }
    }
    this.props.saveWillPayload(payload);
  }

  deletePicture=(key)=>{
    const { workStandard } = this.state;
    let tempData = [];
    // eslint-disable-next-line
    workStandard.map(e=>{
      if(e.key===key){
        const element = { ...e, imageData: '' };
        tempData.push(element)
      }else{
        tempData.push(e)
      }
    })
    this.setState({
      workStandard: tempData
    })
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
      deviceInfo,
      workStandard,
      pictureVisible,
      picData,
    } = this.state;

    // console.log(deviceInfo)

    return (
      <div className='r-deviceInfo'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='任务设备' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='deviceInfo-content' ref={this.taskWrapper}>
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
                <div style={{ fontSize:'14px', marginBottom:40 }}>
                  <div style={{marginBottom:6}}><span style={{ color:'#888' }}>设备名称:</span> {deviceInfo.name}</div>
                  <div><span style={{ color:'#888' }}>设备位置:</span> {deviceInfo.location}</div>
                </div>
                <div style={{ fontWeight:600, marginBottom:10, color:'#555' }}>
                  作业标准:
                </div>
                  {_.isEmpty(workStandard)?'':
                  workStandard.map((e,index)=>(
                    <span key={index}>
                      {
                        // 布尔型
                        e.dataType===1?
                          <div style={{display:'flex', justifyContent:'space-between', width:'100%', padding:'6px 0', borderBottom:'1px solid #efefef', marginBottom:10}}>
                            <div style={{ width:'calc(100% - 60px)', paddingTop:8 }}>
                              {index+1}. {e.name}
                            </div>
                            <div style={{ width:52 }}>
                              <Switch
                                checked={e.defValue==='0'}
                                onChange={deviceInfo.handleResult!=='2'?()=>this.onSwitchChange(e.key):''}
                              />
                            </div>
                          </div>
                        // 图片型
                        :e.dataType===2?
                          <div style={{width:'100%', padding:'6px 0', borderBottom:'1px solid #efefef'}}>
                            <div style={{ width:'100%', paddingTop:8, paddingBottom:8 }}>
                              {index+1}. {e.name}
                            </div>
                            <div style={{ width:'100%', height:60 }}>
                              {deviceInfo.handleResult!=='2'?<div className='addPicture' id='imagePicture' style={{float:'left'}} onClick={()=>this.imagePicture(this,e.key)}>
                                <Icon type='plus' style={{color:'rgb(24,144,255)'}} />
                              </div>:null}
                              {!_.isEmpty(e.imageData)?
                                <div style={{width:60, height:60, marginLeft:20, float:'left' }}
                                  onClick={()=>this.handleShowPicture(true, e.imageData)}
                                >
                                  <img src={e.imageData} alt='img' width={60} height={60} />
                                  {deviceInfo.handleResult!=='2'?<div className='deletePicture' onClick={()=>this.deletePicture(e.key)}>
                                    -
                                  </div>:null}
                                </div>
                              :''}
                            </div>
                          </div>
                        // 文本型
                        :e.dataType===3?
                          <div style={{width:'100%', padding:'6px 0', borderBottom:'1px solid #efefef'}}>
                            <div style={{ width:'100%', paddingTop:8 }}>
                              {index+1}. {e.name}
                            </div>
                            <div style={{ width:'100%' }}>
                              <InputItem
                                value={e.remark}
                                placeholder='请输入数值'
                                disabled={deviceInfo.handleResult==='2'}
                                onChange={deviceInfo.handleResult!=='2'?(v)=>this.onInputChange(e.key,v):''}
                              >数值</InputItem>
                            </div>
                          </div>
                        :null
                      }
                    </span>
                  ))
                  }
              </div>
            }
          </div>
          {deviceInfo.handleResult!=='2'?
            <div style={{width:'calc(100% - 30px)',marginLeft:15, display:'flex', justifyContent:'space-between', position:'absolute', bottom:20}}>
              <Button disabled={deviceInfo.handleResult==='2'} type='primary' style={{width:100}} onClick={this.handleSave}>保存</Button>
              <Link
                to={`/exceptionreport/${this.props.match.params.serviceType}/${this.props.match.params.gridID}`}
              >
                {/* 异常上报点击时,将任务信息暂存后跳转页面。异常上报提交时,同时执行任务提交 */}
                <Button style={{width:100}} onClick={this.handleExceptionPage} type='warning'>异常上报</Button>
              </Link>
              <Button onClick={this.handleSubmit} style={{width:100}} type='primary' >提交</Button>
            </div>
            :null
          }
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

export default DeviceInfo;