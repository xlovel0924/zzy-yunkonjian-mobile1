import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'; 
import form from '../form';
import { findFishingArea } from '@/redux/fishingArea/fishingArea.action';
import { findCameraList } from '@/redux/seaArea/seaArea.action';
import Tuceng from './../../assets/img/tuceng.svg';
import Shuaxin from './../../assets/img/shuaxin.svg';
import Dingwei from './../../assets/img/backcenter.svg';
import Camera from './../../assets/img/camera.svg';
import './rightBtns.css';

@connect(
  state=>({fishing:state.fishing, sea:state.seaArea}),
  { findFishingArea, findCameraList }
)
@form
@withRouter
class RightBtns extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    this.props.findCameraList()
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.sea.cameraList)){
        setTimeout(() => {
          this.props.updateCameraList(nextProps.sea.cameraList)
        }, 100);
      }
    }
  }

  // 刷新按钮
  handleRefresh=()=>{
    // Toast.loading('刷新中...', 2)
    this.props.findFishingArea()
  }

  handleBackCenter=()=>{
    this.props.updateBackCenter()
  }

  handleOpenCameraList=()=>{
    this.props.updteCameraChange()
  }

  handleMapSwitch=()=>{
    this.props.updateMapSwitchChange()
  }

  handleClearHistory=()=>{
    this.props.handleClearShipHistory()
  }

  render(){
    return (
      <div>
        <div className='rtghtBtns' style={{zIndex:999}}>
          <div className='indexBtn-li' onClick={this.handleClearHistory} style={this.props.hideOtherShips?{display:'block'}:{display:'none'}}>
            {/* <img width='14' height='14' className='indexBtn-img' style={{margin:'auto',paddingTop:8}} src={Camera} alt='head' /> */}
            <span style={{fontSize:24,color:'rgb(102,102,102)'}}>x</span>
          </div>
          <div className='indexBtn-li' onClick={this.handleOpenCameraList}>
            <img width='14' height='14' className='indexBtn-img' style={{margin:'auto',paddingTop:8}} src={Camera} alt='head' />
          </div>
          <div className='indexBtn-li' onClick={this.handleMapSwitch}>
            <img width='14' height='14' className='indexBtn-img' style={{margin:'auto',paddingTop:8}} src={Tuceng} alt='head' />
          </div>
          <div className='indexBtn-li' onClick={this.handleRefresh}>
            <img width='14' height='14' className='indexBtn-img' style={{margin:'auto',paddingTop:8}} src={Shuaxin} alt='head' />
          </div>
          <div className='indexBtn-li' onClick={this.handleBackCenter}>
            <img width='14' height='14' className='indexBtn-img' style={{margin:'auto',paddingTop:8}} src={Dingwei} alt='head' />
          </div>
        </div>
      </div>
    )
  }
}

export default RightBtns;