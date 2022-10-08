import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import { Modal, List, Toast, PickerView } from 'antd-mobile';
import { getNowFormatDate } from '@/utils/baseUtil';
import { findAisHistory, clearAisHistory } from '@/redux/ship/ship.action';
import './modals.css';

const times = [
  {
    kay: 1,
    label: '30分钟',
    value: '30',
  },
  {
    kay: 2,
    label: '60分钟',
    value: '60',
  },
  {
    kay: 3,
    label: '90分钟',
    value: '90',
  },
  {
    kay: 4,
    label: '120分钟',
    value: '120',
  },
  {
    kay: 5,
    label: '150分钟',
    value: '150',
  },
];

@connect(
  state=>({ship:state.ship}),
  { findAisHistory, clearAisHistory }
)
@withRouter
class Modals extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      time:['90'],
    };
    this.goHistoryInfo = this.goHistoryInfo.bind(this);
  }

  onClose=()=>{
    const {updateShowModal} = this.props;
    updateShowModal()
  }

  onCloseTimeModal=()=>{
    const {updateShowTimeModal} = this.props;
    updateShowTimeModal()
  }

  goHistoryInfo(){
    this.props.history.push('/history');
  }
  handleToast=()=>{
    Toast.fail("暂未开放",1.5)
  }

  onScrollChange = (value) => {
    this.setState({
      time:value,
    });
  }

  p(s) {
    return s < 10 ? '0' + s : s
  }

  handleChooseTimeOk=()=>{
    const {modalType,modalInfo,updateRemoveAisLayers} = this.props;
    updateRemoveAisLayers()
    const time = this.state.time[0];
    this.doFindHistory(modalType,modalInfo,time)
    this.props.updateShowTimeModal()
    this.props.updateShowModal(modalType)
    setTimeout(() => {
      this.props.showOneAisShip()
    }, 1000);
  }

  // 调接口查询船舶历史轨迹
  doFindHistory=(modalType,modalInfo,time)=>{
    // if(modalType==='aisShip'){
      const id = modalType==='aisShip'||modalType==='alarmAisShip'?parseInt(modalInfo.mmsiID):parseInt(modalInfo.arpaid);
      // const nowTimeStamp = Date.now();
      // const now = new Date(nowTimeStamp);
      // const d = new Date(now);
      const resDate = moment().subtract(-5,'minute').format('YYYY-MM-DD HH:mm:ss')
      this.props.findAisHistory(id,getNowFormatDate(time),resDate,modalType)
    // }else if(modalType==='arpaShip'){
      // const nowTimeStamp = Date.now();
      // const now = new Date(nowTimeStamp);
      // const d = new Date(now);
      // const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())+ ' ' +
      // this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
      // this.props.UpdateArpaHistoryMock(modalInfo.dataSrc, modalInfo.arpaid, modalInfo.cycleCount,getNowFormatDate(time),resDate)
    // }else if(modalType==='alarmShip'){
      // const id = parseInt(modalInfo.targetID);
      // const startTime = modalInfo.alarmTime;
      // this.handleFindAisHistory(id,startTime,this.getNowDate())
    // }
  }

  // 查询Ais历史记录
  handleFindAisHistory=(id,startTime,endTime)=>{
    this.props.clearAisHistory() // 清除reducer内历史记录
    this.props.updateClearAisHistory()
    setTimeout(() => {
      this.props.findAisHistory(id,startTime,endTime)
    }, 100);
  }

  renderModal(){
    const {modalType,showModal,modalInfo} = this.props;

    // ais船详情
    if(modalType==='aisShip' || modalType==='alarmAisShip'){
      let shipName = '-';
      if(!_.isEmpty(modalInfo.shipName)){
        shipName = modalInfo.shipName
      }
      return (
        <Modal
          popup
          visible={showModal}
          onClose={this.onClose}
          animationType="slide-up">
          <List renderHeader={() => <div className='modal-title'>
            <div className='shortLine'></div>
            <div className='modals-name' style={{float:'left'}}>{shipName}</div>
            <div className='modals-item-name' style={{float:'right'}}><span style={{color:'#FB6464',fontSize:'11px'}}>MMSI : {modalInfo.mmsiID}</span></div>
            </div>
            }
            className='modals-item popup-list'>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>经度</div>
                      <div className='modals-list-item-value'>{modalInfo.longitude}</div>
                  </div>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>纬度</div>
                      <div className='modals-list-item-value'>{modalInfo.latitude}</div>
                  </div>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>航向</div>
                      <div className='modals-list-item-value'>{modalInfo.cog} °</div>
                  </div>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>航速</div>
                      <div className='modals-list-item-value'>{modalInfo.sog} 节</div>
                  </div>
                  <div className='modals-item-list' style={{width:'100%'}}>
                      <div className='modals-list-item-name'>采集</div>
                      <div className='modals-list-item-value'>{modalInfo.timeStamp}</div>
                  </div>
              
              <div className='twoBtns'>
                <div className='modals-btn' style={{backgroundColor:'rgba(70, 97, 255, 0.2)',color:'rgb(70, 97, 255)'}}
                 onClick={()=>this.props.handleClearShipHistory(modalInfo.mmsiID)}>
                  清除轨迹
                </div>
                <div className='modals-btn' onClick={()=>this.props.updateShowTimeModal()}>
                  航迹查询
                </div>
              </div>
              
          </List>
        </Modal>
      )
    };

    // arpa船详情
    if(modalType==='arpaShip' || modalType==='alarmArpaShip' ){
      return (
        <Modal
          popup
          visible={showModal}
          onClose={this.onClose}
          animationType="slide-up">
          <List renderHeader={() => <div className='modal-title'>
            <div className='shortLine'></div>
            <div className='modals-name' style={{float:'left'}}>雷达ID : {modalInfo.arpaid}</div>
            </div>
            }
            className='modals-item popup-list'>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>经度</div>
                      <div className='modals-list-item-value'>{modalInfo.lon}</div>
                  </div>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>纬度</div>
                      <div className='modals-list-item-value'>{modalInfo.lat}</div>
                  </div>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>航向</div>
                      <div className='modals-list-item-value'>{modalInfo.course} °</div>
                  </div>
                  <div className='modals-item-list'>
                      <div className='modals-list-item-name'>航速</div>
                      <div className='modals-list-item-value'>{modalInfo.speed} 节</div>
                  </div>
                  <div className='modals-item-list' style={{width:'100%'}}>
                      <div className='modals-list-item-name'>采集</div>
                      <div className='modals-list-item-value'>{modalInfo.time}</div>
                  </div>
              <div className='twoBtns'>
                <div className='modals-btn' style={{backgroundColor:'rgba(70, 97, 255, 0.2)',color:'rgb(70, 97, 255)'}} 
                onClick={()=>this.props.handleClearShipHistory(modalInfo.arpaid)}>
                  清除轨迹
                </div>
                <div className='modals-btn' onClick={()=>this.props.updateShowTimeModal()}>
                  航迹查询
                </div>
              </div>
          </List>
        </Modal>
      )
    };


    // 渔区标绘详情
    if(modalType==='fishingArea'){
      return (
        <Modal
          popup
          visible={showModal}
          onClose={this.onClose}
          animationType="slide-up">
          <List renderHeader={() => <div className='modal-title'>
            <div className='shortLine'></div>
            <div className='modals-name' style={{float:'left',width:'50%'}}>{modalInfo.productName}</div>
            <div className='modals-item-name' style={{float:'right'}}><span style={{color:'#FB6464',fontSize:'11px'}}>{modalInfo.fishingAreaId}</span></div>
            </div>
            }
            className='modals-item popup-list'>
              <div className='modals-item-list'>
                  <div className='modals-list-item-name'>海域位置</div>
                  <div className='modals-list-item-value' style={{fontSize:12, paddingLeft:10}}>{modalInfo.address}</div>
              </div>
              <div className='modals-item-list'>
                  <div className='modals-list-item-name'>海域编号</div>
                  <div className='modals-list-item-value' style={{fontSize:12, paddingLeft:10}}>{modalInfo.seaAreaNumber}</div>
              </div>
              <div className='modals-item-list'>
                  <div className='modals-list-item-name'>海域用途</div>
                  <div className='modals-list-item-value' style={{fontSize:12, paddingLeft:10}}>{modalInfo.purpose}</div>
              </div>
              <div className='modals-item-list'>
                  <div className='modals-list-item-name'>所属人</div>
                  <div className='modals-list-item-value' style={{fontSize:12, paddingLeft:10}}>{modalInfo.obligee}</div>
              </div>
              <div className='modals-item-list' style={{width:'calc(100% - 28px)'}}>
                  <div style={{fontSize:12,paddingLeft:0,textAlign:'center'}}>使用期限 : {JSON.parse(modalInfo.serviceLife)[0]}至{JSON.parse(modalInfo.serviceLife)[1]}</div>
              </div>
          </List>
        </Modal>
      )
    };
  }

  render(){
    return (
      <div className='r-modals'>
        {this.renderModal()}
        <Modal
          popup
          visible={this.props.showTimeModal}
          onClose={this.onCloseTimeModal}
          animationType="slide-up">
            <div className='choosetime' style={{margin:'0 0 28px 0'}}>
              <div className='choosetime-title'>
                <div className='choosetime-btn' onClick={()=>this.props.updateShowTimeModal()}>取消</div>
                <div className='titlename' style={{lineHeight:'50px'}}>航迹查询</div>
                <div className='choosetime-btn' onClick={()=>this.handleChooseTimeOk()}>确定</div>
              </div>
              <PickerView
                data={times}
                onScrollChange={this.onScrollChange}
                cols={1}
                value={['90']}
                cascade={false}
              />
            </div>  
        </Modal>
      </div>
    )
  }
}

export default Modals;