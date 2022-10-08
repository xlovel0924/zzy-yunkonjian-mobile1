import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import Head from './../../components/head';
import history from '@/history';
import { saveDeviceInfo, scanDevice } from '@/redux/task/task.action';
import form from './../../components/form';
import './scan.css';
import { Toast } from 'antd-mobile';

@connect(
  state=>({ task:state.task}),
  { saveDeviceInfo, scanDevice }
)
@withRouter
@form
class Scan extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  componentDidMount() {
    this.openLabrary();
  };

  handleBack() {
    history.goBack();
  }
  
  openLabrary=()=>{
    this.props.saveDeviceInfo();
    const _this = this
    // eslint-disable-next-line no-undef
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        // alert(
        //   "We got a barcode\n" +
        //   "Result: " + result.text + "\n" +
        //   "Format: " + result.format + "\n" +
        //   "Cancelled: " + result.cancelled
        // );
        if(Array.isArray(JSON.parse(result.text))){
          _this.props.scanDevice({qrCodeId:JSON.parse(result.text)[0], props:_this.props});
        }
      },
      function (error) {
        Toast.info("扫描失败", 1.2);
        // _this.openLabrary()
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
    return (
      <div className='r-scan'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='二维码扫描' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='scan-content'>
        </div>
      </div>
    )
  }
}

export default Scan;