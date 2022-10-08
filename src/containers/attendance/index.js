import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import L from 'leaflet';
import _ from 'lodash';
import moment from 'moment';
import 'leaflet.chinatmsproviders';
import coordtransform from 'coordtransform';
import { Toast, Button } from 'antd-mobile';
import history from '@/history';
import { findSignInfo, signIn, clockInArea } from '@/redux/attendance/attendance.action';
import iconDingWeiDian from '@/assets/img/iconDingWeiDian.svg';
import iconRefresh from '@/assets/img/iconRefresh.svg';
import Head from '@/components/head';
import form from '@/components/form';
import './index.css';
// import e from 'express';      //  解开网页报错 !!!!!!!!!!!!!!!!! 
let areaInterval = null;
@connect(
  state=>({attendance:state.attendance}),
  { findSignInfo, signIn, clockInArea }
)
@withRouter
@form
class Attendance extends React.Component{
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      signInfo: {},
      isInArea: false,
    }
  }

  componentDidMount(){
    this.props.findSignInfo();
    let zoom = 15;
    let center = [];
    // 样式
    const Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', { maxZoom: 18, minZoom: 1 , updateWhenIdle: false, unloadInvisibleTiles:true,});
    const baseLayers = {
      "高德地图": Gaode, 
    } 
    let lat = '31.264301'; let lng = '121.475444';
    center.push(lat);center.push(lng);
    this.map = L.map('attendanceMap', {
      crs: L.CRS.EPSG3857,
      center: center,
      zoom: zoom,
      layers: [Gaode],
      zoomControl: true,
    });
    this.map.invalidateSize(true);
    L.control.layers(baseLayers, null).addTo(this.map);
    this.onDeviceReady();
    // 每分钟查询一次位置
    areaInterval = setInterval(() => {
      this.onDeviceReady()
    }, 60000);
  }

  // 离开页面卸载定时器
  componentWillUnmount(){
    clearInterval(areaInterval);
    areaInterval = null
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps') 
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.attendance) && !_.isEmpty(nextProps.attendance.signInfo)){
        this.setState({
          signInfo: nextProps.attendance.signInfo
        })
      }else{
        this.setState({
          signInfo:[]
        })
      }
      if(!_.isEmpty(nextProps.attendance)){
        this.setState({
          isInArea: nextProps.attendance.isInArea?true:false
        })
      }
    }
  }

  handleBack() {
    history.goBack();
  }

  // 获取当前位置, 并查询是否在打卡区域内
  onDeviceReady=()=> {
    this.setState({
      isInArea: false
    })
    // 定位
    const _this = this;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
      console.log(position.coords.latitude+","+position.coords.longitude);
      const lnglat = coordtransform.wgs84togcj02(position.coords.longitude, position.coords.latitude);
      _this.map.panTo([lnglat[1], lnglat[0]]);
      _this.map.setZoom(16)
      L.marker([lnglat[1], lnglat[0]]).addTo(_this.map)
      // eslint-disable-next-line no-undef
      const geocoder = new AMap.Geocoder({
        city: "010", //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });
      // 检查当前位置是否在打卡区域内
      _this.props.clockInArea(lnglat)
      geocoder.getAddress(lnglat, function(status, result) {
        // console.log(status);
        // console.log(result);
        if (status === 'complete'&&result.regeocode) {
            const str = result.regeocode.addressComponent;
            const address = str.province+""+str.district+""+str.street+""+str.streetNumber+"附近";
            document.getElementById('signAddress').innerHTML = address;
            console.log(address);
        }else{
          console.log('根据经纬度查询地址失败')
        }
      });
    };
    // onError Callback receives a PositionError object
    function onError(error) {
      Toast.info('code: '+error.code+'message: '+ error.message +'\n');
    }
  }

  renderWorkTime=()=>{
    const { signInfo } = this.state;
    let startTime = '--:--';
    let endTime = '--:--';
    let startAddress = '-';
    let endAddress = '-';
    if(!_.isEmpty(signInfo) && Array.isArray(signInfo)){
      signInfo.map(e=>{
        if(e.functionType==='1'){
          startTime = e.signTime;
          startAddress = e.address;
        }else if(e.functionType==='2'){
          endTime = e.signTime;
          endAddress = e.address;
        }
      })
    }
    return <div>
      <div className='signInfo' style={{marginBottom:27}}>
        <div className='signTime'>
          打卡时间:&nbsp;&nbsp;{startTime}
        </div>
        <div className='signInAddress'>
          <img src={iconDingWeiDian} alt="icon" width={14} height={14} style={{verticalAlign:'sub'}} />
            <span>&nbsp;&nbsp;{startAddress}</span>
        </div>
      </div>
      <div className='signInfo'>
        <div className='signTime'>
          打卡时间:&nbsp;&nbsp;{endTime}
        </div>
        <div className='signInAddress'>
          <img src={iconDingWeiDian} alt="icon" width={14} height={14} style={{verticalAlign:'sub'}} />
            <span>&nbsp;&nbsp;{endAddress}</span>
        </div>
      </div>
    </div>
  }

  // 打卡按钮
  onSignIn=()=>{
    // 获取定位信息
    const _this = this;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
      console.log(position.coords.latitude+","+position.coords.longitude);
      const lnglat = coordtransform.wgs84togcj02(position.coords.longitude, position.coords.latitude);
      console.log(lnglat)
      _this.map.panTo([lnglat[1], lnglat[0]]);
      _this.map.setZoom(16)
      L.marker([lnglat[1], lnglat[0]]).addTo(_this.map)
      // eslint-disable-next-line no-undef
      const geocoder = new AMap.Geocoder({
        city: "010", //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });
      geocoder.getAddress(lnglat, function(status, result) {
        // console.log(status);
        // console.log(result);
        if (status === 'complete'&&result.regeocode) {
            const str = result.regeocode.addressComponent;
            const address = str.province+""+str.district+""+str.street+""+str.streetNumber+"附近";
            document.getElementById('signAddress').innerHTML = address;
            // console.log(address);
            // 调用打卡接口
            _this.props.signIn({address:address, lonLat:lnglat})
        }else{
          console.log('根据经纬度查询地址失败')
          // 调用打卡接口
          _this.props.signIn({address:'未知', lonLat:lnglat})
        }
      });
    };
    // onError Callback receives a PositionError object
    function onError(error) {
      Toast.info('code: '+error.code+'message: '+ error.message +'\n');
    }
  }

  render(){
    const { isInArea } = this.state;
    
    return (
      <div className='r-attendance'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='签到' handleBack={this.handleBack} hasShadow={true}></Head>
        <Link to='/attendancerecord'>
          <div style={{position:'absolute', zIndex:1000, top:43, right:15, color:'#fff'}}>
            打卡记录
          </div>
        </Link>
        <div className='attendance-content'>
          <div id='attendanceMap' style={{width:'100%', height:'calc(100% - 280px)'}}/>
          {/* <div id="signAddress">定位中...</div> */}
          <div className='bottomSign'>
            <div className='btnRefresh' onClick={this.onDeviceReady}>
              <img src={iconRefresh} alt='icon' width={30} height={30} style={{margin:'1px'}} />
            </div>
            <div style={{fontSize:'15px', color:'#343434', fontWeight:600, marginBottom:20}}>
              {moment().format('MM月DD日')}
            </div>
            <div style={{height:140, width:'100%'}}>
              <div className='signLeft'>
                <div style={{marginBottom:60}}>
                  开始考勤时间
                </div>
                <div>
                  结束考勤时间
                </div>
              </div>
              <div className='signCenter'>
                <div style={{width:10, height:10, borderRadius:'50%', backgroundColor:'#C6C6C6', marginTop:3}} />
                <div style={{height:53, width:4, borderRight:'2px solid #c6c6c6', margin:'5px 0'}} />
                <div style={{width:10, height:10, borderRadius:'50%', backgroundColor:'#C6C6C6'}} />
              </div>
              <div className='signRight'>
                {this.renderWorkTime()}
              </div>
            </div>
            <Button disabled={!isInArea} type='primary' style={{width:'100%'}} onClick={this.onSignIn} >
              {isInArea?'打卡':'不在可打卡区域'}
            </Button>
            <div style={{textAlign:'center', marginTop:6}}>
              <img src={iconDingWeiDian} alt="icon" width={14} height={14} style={{verticalAlign:'sub'}} />
              &nbsp;&nbsp;<span id='signAddress'>定位中...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Attendance;