import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import L from 'leaflet';
import 'leaflet.chinatmsproviders'
import coordtransform from 'coordtransform';
import { Toast } from 'antd-mobile';
import { bind, clearBindSuccess, redirectToIndex, clearRedirect } from '@/redux/user/user.action';
import form from './../../../components/form';
import './seaCode.css';

@connect(
  state=>state.user,
  { bind, clearBindSuccess, redirectToIndex, clearRedirect }
)
@withRouter
@form
class SeaCode extends React.Component{
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      
    }
  }

  componentDidMount(){
    let zoom = 15;
    let center = [];
    // 样式
    const Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', { maxZoom: 18, minZoom: 1 , updateWhenIdle: false, unloadInvisibleTiles:true });
    
    const baseLayers = {    
      "高德地图": Gaode, 
    } 
    let lat = '31.264301'; let lng = '121.475444';
    center.push(lat);center.push(lng);
    this.map = L.map('map', {
      crs: L.CRS.EPSG3857,
      center: center,
      zoom: zoom,
      layers: [Gaode], 
      zoomControl: true,
    });
    this.map.invalidateSize(true);
    L.control.layers(baseLayers, null).addTo(this.map);  
    this.onDeviceReady();
  }

  onDeviceReady() {
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
      geocoder.getAddress(lnglat, function(status, result) {
        // console.log(status);
        // console.log(result);
        if (status === 'complete'&&result.regeocode) {
            const str = result.regeocode.addressComponent;
            const address = str.province+""+str.district+""+str.street+""+str.streetNumber+"附近";
            document.getElementById('address').innerHTML = address;
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

  render(){
    return (
      <div className='r-sea-code'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <div className='seaCode-content'>
          <div id='map' style={{width:'100%', height:'100%'}}/>
          <div id="address">定位中......</div>
        </div>
      </div>
    )
  }
}

export default SeaCode;