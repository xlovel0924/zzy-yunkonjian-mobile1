  import React from 'react';
  import { connect } from 'react-redux';
  import BScroll from 'better-scroll';
  import _ from 'lodash';
  import {withRouter, Redirect} from 'react-router-dom';
  import { Button, Toast, Picker, List, TextareaItem, Icon, InputItem } from 'antd-mobile';
  import Head from '../../../components/head';
  import moment from 'moment';
  import history from '@/history';
  import { exceptionSubmit, clearExceptionSubmitStatus, getGridTree, saveWillPayload, doSBXJ, doSBBY, doSBYX, pointListReport, doSBBX, doSJSB, clearGridList } from '@/redux/task/task.action';
  import arrayTreeFilter from 'array-tree-filter';
  import iconPlay from '@/assets/img/iconPlay.svg';
  import iconStop from '@/assets/img/iconStop.svg';
  import form from '../../../components/form';
  import { smallOwnersUrl } from '@/server/service';
  import './index.css';
  
  let mediaRec;  
  let recTimeMax = 60;
  let recTime = 0;  
  let recordFile = "exceptRep.amr";
  let percentInterval;
  
  @connect(
    state=>({task:state.task}),
    { exceptionSubmit, clearExceptionSubmitStatus, getGridTree, saveWillPayload, doSBXJ, doSBBY, doSBYX, pointListReport, doSBBX, doSJSB, clearGridList }
  )
  @withRouter
  @form
  class DoReportTask extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        recorded: false,        // 是否有录音  此项为 true 才能提交
        remark:'',              // 事件详情
        pictureList: [],        // 照片文件列表
        viewWidth: 0,           // 屏幕宽
        deviceInfo: {},         // 设备详情
        address: '',            // 设备位置 手动输入详细位置
        recordTime: 0,          // 录音时长 (用于显示)
        isPlayAudio: false,     // 是否在播放录音
        willPayload: {},      // 作业标准数据,提交异常时同时提交任务(已完成)
        pictureVisible: false,
        picData: '',   
        audioPercent: 0,         // 音频显示条
        recording: false,       // 是否正在录音(正在录音时再次点击无效, 保存音频时会有一点点延迟此时不能点击录音)
      }
      this.taskWrapper = ref =>{this.taskWrappers=ref};
    };
    componentWillMount(){
      this.props.clearGridList()
    }
    componentDidMount(){
      this.setState({
        viewWidth : document.querySelector('body').offsetWidth,
      })
      // this.initScroll();
      const payload = {
        id: this.props.match.params.missionId,
        type: this.props.match.params.serviceType,
      }
      this.props.pointListReport(payload)
    }
  
    // initScroll() {
    //   this.taskScroll = new BScroll(this.taskWrappers, {
    //     click: true,
    //     probeType: 3
    //   });
    //   // console.log(this.alarmDetailScroll);
    // }
  
    componentWillReceiveProps(nextProps){
      if(!_.isEmpty(nextProps)){
        if(!_.isEmpty(nextProps.task) && !_.isEmpty(nextProps.task.deviceInfo)){
          this.setState({
            deviceInfo: nextProps.task.deviceInfo,
          })
        }else{
          this.setState({
            deviceInfo:{}
          })
        }
      }
    }
  
  
    handleBack=()=> {
      history.goBack();
    }
  
    // 事件详情
    inputChange=(v)=>{
      this.setState({
        remark:v
      })
    }
  
    // 删除图片
    deletePicture=(index)=>{
      this.state.pictureList.splice(index,1);
      this.forceUpdate();
    }
  
  
    // 相册
    imageCapture(){
      // console.log('新-----摄像头')
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50, //图像的保存质量，范围0-100，100是最大值，最高的分辨率，没有任何压缩损失
        // eslint-disable-next-line no-undef
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,//指定图片来自相册
        allowEdit: true,  //允许在选择图片之前进行简单的编辑
        correctOrientation: true, // 如果是横向拍摄的照片，会自动旋转到正确的方向
        saveToPhotoAlbum: true, // 备拍照后的图像是否保存的图片库中
        // eslint-disable-next-line no-undef
        destinationType: Camera.DestinationType.DATA_URL // 选择返回值的格式
      });
      function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
      }
   
      function onFail(message) {
        alert('message picture error: ' + message);
      }
    };
  
    // 打开相机
    imagePicture=(_this)=> {
      const {viewWidth, pictureList} = this.state;
      if(pictureList.length>=4){
        Toast.info('最多上传4张照片',1.3)
      }else{
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
          const {pictureList} = _this.state;
          // console.log('成功')
          // console.log(pictureList.length);
          // console.log(imageData)
          // var image = document.getElementById('myImage');
          // image.src = "data:image/jpeg;base64," + imageData;
          // image.width = 60;
          // image.height = 60;
          pictureList.push("data:image/jpeg;base64," + imageData);
          _this.setState({
            pictureList: pictureList,
          })
          // console.log(_this.state);
        }
        function onFail(message) {
          // alert('取消: ' + message);
        }
      }
    };
  
    // 开始录音
  onTouchStartRecordAudio=(_this)=> {
    this.setState({
      recording: true
    })
    var src = recordFile; 
    // eslint-disable-next-line no-undef
    mediaRec = new Media(src, onSuccess, onError);
    // Record audio
    mediaRec.startRecord();
    // Stop recording after 10 sec
    recTime = 0;
    let tempRecordTime = 0;
    var recInterval = setInterval(function() {
      recTime = recTime + 1;
    if (recTime >= recTimeMax) {
        clearInterval(recInterval);
        mediaRec.stopRecord();
        mediaRec.release();
    }else if(recTime < recTimeMax){
      tempRecordTime = tempRecordTime+1
      _this.setState({
        recordTime: tempRecordTime
      })
    }
    }, 1000);
    function onSuccess() {
      Toast.info("录音完成",1.0);
      if(!_this.state.recorded){
        _this.setState({
          recorded: true,
          recording: false,
        })
      }
    }
    // onError Callback  
    function onError(error) {
      Toast.info("录音失败,请确认有录音权限",1.3);
      // alert(
      //   'code: '    + error.code    + '\n' +  
      //   'message: ' + error.message + '\n'
      // );  
    }
  };

  // 结束录音
  onTouchEndRecordFinish=()=>{
    recTime = recTimeMax;  
  };

  // 播放
  playAudio=(_this)=>{
    const { isPlayAudio, recordTime } = this.state;
    let percent = 0;
    percentInterval = setInterval(()=> {
      percent = percent + 1;
      this.setState({
        audioPercent: parseInt(percent/recordTime*100)>100?100:parseInt(percent/recordTime*100)
      })
    }, 1000);
    if(!isPlayAudio){
      // Play the audio file at url  
      // eslint-disable-next-line no-undef
      mediaRec = new Media("exceptRep.amr",  
        // success callback  
        function() {
          percent = 0;
          // 播放完成清除定时器
          clearInterval(percentInterval)
          percentInterval = null
          // 进度条延迟0.5秒归零
          _this.setState({
            isPlayAudio: false,
            audioPercent: 0
          })
        },
        // error callback  
        function(err) {   
      });  
      // Play audio  
      mediaRec.play();
      this.setState({
        isPlayAudio: true
      })
    }
  } 

  // 停止播放
  stopAudio=()=>{
    if(mediaRec) {
    }
    // 清除播放进度条定时器
    clearInterval(percentInterval);
    percentInterval = null;
    this.setState({
      audioPercent: 0
    })
    recTime = recTimeMax;
    // Play audio
    mediaRec.stop();
    this.setState({
      isPlayAudio: false
    })
  }
  
    // 提交
    handleSubmit=(_this)=>{
      // 判断是否录音,true才能提交
      if(this.state.recorded){
        const id = `${moment().format('YYYYMMDDHHmmss')}${String.fromCharCode(65+Math.ceil(Math.random() * 25))}${String.fromCharCode(65+Math.ceil(Math.random() * 25))}`
        var win = function (r) {
          // alert("提交成功");
          // console.log("Code = " + r.responseCode);
          // console.log("Response = " + r.response);
          // r.response.status 提交状态true/false  r.response.data 返回的音频URL
          // 音频提交成功以后提交所有数据
          if(JSON.parse(r.response).status){
            const { deviceInfo } = _this.state;
            // console.log('录音提交成功,提交其他数据')
            // console.log(r.response.data)
            // const payload = {
            //   id: id,
            //   json: JSON.stringify({audioUrl:JSON.parse(r.response).data, pictureList:_this.state.pictureList}),
            //   location: _this.state.locationIdList[_this.state.locationIdList.length-1],
            //   address: _this.state.address,
            //   description: _this.state.remark,
            //   objectID: _this.state.deviceInfo.objectID,
            //   objectName: _this.state.deviceInfo.para3,
            //   createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            //   nodeInstanceID: JSON.parse(localStorage.getItem('user')).key,
            //   nodeInstanceName: JSON.parse(localStorage.getItem('user')).cname,
            // }
            const payload={
              "createDate": !_.isEmpty(deviceInfo.createDate)?deviceInfo.createDate:'',
              "createPerson": "",
              "id": deviceInfo.id,
              "location": !_.isEmpty(deviceInfo.location)?deviceInfo.location:'',
              "name": !_.isEmpty(deviceInfo.name)?deviceInfo.name:'',
              "objectID": !_.isEmpty(deviceInfo.objectID)?deviceInfo.objectID:'',
              "objectType": !_.isEmpty(deviceInfo.objectType)?deviceInfo.objectType:'',
              "para1": !_.isEmpty(deviceInfo.para1)?deviceInfo.para1:'',
              "para10": "",
              "para2": !_.isEmpty(deviceInfo.para2)?deviceInfo.para2:'',
              "para3": !_.isEmpty(deviceInfo.para3)?deviceInfo.para3:'',
              "para4": "",
              "para5": "",
              "para6": "",
              "para7": "",
              "para8": "",
              "para9": "",
              "processItem1": !_.isEmpty(deviceInfo.processItem1)?deviceInfo.processItem1:'',
              "processItem10": "",
              "processItem2":  !_.isEmpty(deviceInfo.processItem2)?deviceInfo.processItem2:'',
              "processItem3": JSON.stringify(
                  {
                    audioUrl: JSON.parse(r.response).data,
                    recordTime: _this.state.recordTime,
                    pictureList: _this.state.pictureList,
                    description: _this.state.remark,
                    nodeInstanceID: JSON.parse(localStorage.getItem('user')).key,
                    nodeInstanceName: JSON.parse(localStorage.getItem('user')).cname,
                  }
                ),
              "processItem4": "",
              "processItem5": "",
              "processItem6": "",
              "processItem7": "",
              "processItem8": "",
              "processItem9": "",
              "seq": !_.isEmpty(deviceInfo.seq)?deviceInfo.seq:'',
              "serviceState": !_.isEmpty(deviceInfo.serviceState)?deviceInfo.serviceState:'',
              "state": !_.isEmpty(deviceInfo.state)?deviceInfo.state:'',
              "type": !_.isEmpty(deviceInfo.type)?deviceInfo.type:'',
              "userID": JSON.parse(localStorage.getItem('user')).key,
              "workflowBeginDate": !_.isEmpty(deviceInfo.workflowBeginDate)?deviceInfo.workflowBeginDate:'',
              "workflowEndDate": !_.isEmpty(deviceInfo.workflowEndDate)?deviceInfo.workflowEndDate:'',
              "workflowID": !_.isEmpty(deviceInfo.workflowID)?deviceInfo.workflowID:'',
              "workflowState": !_.isEmpty(deviceInfo.workflowState)?deviceInfo.workflowState:''
            }
            console.log('payload----')
            console.log(payload)
            if(_this.props.match.params.serviceType==='4'){
              _this.props.doSJSB(payload);
            }else if(_this.props.match.params.serviceType==='5'){
              _this.props.doSBBX(payload);
            }
            
          }
          // console.log("Sent = " + r.bytesSent);
          // console.log("status = " + r.data.data);
          // console.log("data = " + r.data.data);
        }
        var fail = function (error) {
          Toast.info('提交音频失败,请检查网络后重试');
          // alert("An error has occurred: Code = " + JSON.stringify(error));
          // console.log("upload error source " + error.source);
          // console.log("upload error target " + error.target);
        }
        // eslint-disable-next-line no-undef
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = recordFile;
        options.mimeType = "audio/wav";
        options.httpMethod = "POST";
        options.params={};
        options.headers = {
          "Connection": "close",
        }
        options.chunkedMode = false;
        // eslint-disable-next-line no-undef
        var ft = new FileTransfer();
        ft.upload('/sdcard/'+recordFile, encodeURI(`${smallOwnersUrl('record_upload')}?id=${id}`), win, fail, options);
      }else{
        Toast.info('请先录音',1.2)
      }
    };
  

    
    // 预览图片
    handleShowPicture = (flag, picData) =>{
      this.setState({
        picData: picData,
        pictureVisible: flag
      })
    }

    
    render(){
      const {
        pictureList,
        viewWidth,
        deviceInfo,
        isPlayAudio,
        recorded,
        recordTime,
        pictureVisible,
        picData,
        recording,
        audioPercent,
      } = this.state;
      // console.log('deviceInfo')
      // console.log(deviceInfo)
      return (
        <div className='r-doReport'>
          { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
          <Head title='执行任务' handleBack={this.handleBack} hasShadow={true}></Head>
          <div className='doReport-content'>
            <div style={{backgroundColor:'#fff'}}>
              <div style={{
                margin:'0 15px 0', width:'calc(100% - 30px)', padding:'12px 0 10px', borderBottom:'1px solid #e8e8e8',
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
              }}>
                设备名称 <span style={{color:'#555', display:'inline-block', marginLeft:26}}>{!_.isEmpty(deviceInfo.para3)?deviceInfo.para3:'-'}</span>
              </div>
            </div>
            <div style={{marginTop:10, backgroundColor:'#fff', marginBottom:10}}>
              <TextareaItem
                onChange={this.inputChange}
                rows={5}
                placeholder="请输入执行详情"
              />
            </div>
            <div style={{background:'#fff', padding:'10px 15px', width:'calc(100% - 30px)', height:40, display:'flex', justifyContent:'space-between'}}>
              <Button type='ghost' className='recordBtn' style={{border:'1px solid rgb(24,144,255)'}}
                // 录音
                onTouchStart={!recording?()=>this.onTouchStartRecordAudio(this):''} onTouchEnd={this.onTouchEndRecordFinish} type="button"
              >
                <div className='exRecordRound' style={{display:'inline-block', marginRight:10, verticalAlign:'text-top'}} />
                <span>录音</span>
              </Button>
              <div style={{width:'calc(100% - 110px)', backgroundColor:'#abc', borderRadius:'5px', overflow:'hidden', position:'relative'}}>
                <div style={{ position:'absolute', top:0,left:0,right:0,bottom:0, height:'100%', background:recorded?'#74C6FF':'#bbb'}} />
                <div style={{ width:`${audioPercent}%`, position:'absolute', height:'100%', background:'#0088FE'}} />
                {!isPlayAudio?
                  <div style={{width:24, height:24, borderRadius:'50%', background:'#fff', marginTop:8, marginLeft:15, position:'absolute'}}
                  >
                    <div style={{paddingTop:4, paddingLeft:1, width:'100%', textAlign:'center'}}
                      onClick={recorded?()=>this.playAudio(this):''}
                    >
                      <img src={iconPlay} width={16} height={16} />
                    </div>
                  </div>:
                  <div style={{width:24, height:24, borderRadius:'50%', background:'#fff', marginTop:8, marginLeft:15, position:'absolute'}}
                  >
                    <div style={{paddingTop:4, width:'100%', textAlign:'center'}}
                      onClick={this.stopAudio} 
                    >
                      <img src={iconStop} width={16} height={16} />
                    </div>
                  </div>
                }
                <div style={{lineHeight:'40px', color:'#fff', fontSize:'18px', position:'absolute', right:20}}>
                  {recordTime}"
                </div>
              </div>
              {/* <div style={{width:40, height:40, textAlign:'center', marginRight:-10, marginLeft:10 }}>
                <div style={{marginTop:9}}><Icon type='cross-circle-o' style={{color:'#aaa'}} /></div>
              </div> */}
            </div>
            <div style={{width:'calc(100% - 30px)', backgroundColor:'#fff', marginTop:10, padding:'15px 15px 0'}}>事件照片</div>
            <div className='pictureContent'>
              <div className='addPicture' id='imagePicture' onClick={()=>this.imagePicture(this)}>
                <Icon type='plus' style={{color:'rgb(24,144,255)'}} />
              </div>
  
              {_.isEmpty(pictureList)?null:
                pictureList.map((e,index)=>(
                  <div 
                    className='pictureBox' 
                    style={{ marginLeft:(viewWidth - 330)/3 }}
                    id='imageCapture'
                    onClick={()=>this.handleShowPicture(true, e)}
                  >
                    <img height={58} width={58} src={e} alt=""/>
                    <div id='myImage' className='deleteIcon' onClick={()=>this.deletePicture(index)} >-</div>
                  </div>
                ))
              }
            </div>
            <Button
              onClick={()=>this.handleSubmit(this)}
              type='primary' 
              style={{width:'calc(100% - 30px)', background:'#fff', boxShadow:'0 1px 4px rgb(0,0,0,0.1)', position:'absolute',bottom:15, left:15}}
            >
              完成提交
            </Button>
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
  
  export default DoReportTask;