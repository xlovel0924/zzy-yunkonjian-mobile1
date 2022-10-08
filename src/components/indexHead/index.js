import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {withRouter} from 'react-router-dom'
import { Badge } from 'antd-mobile';
import { findFishingArea, newAlarmToast } from '@/redux/fishingArea/fishingArea.action';
import { alarmPendingListMock } from '@/redux/alarm/alarm.action';
import Wode from './../../assets/img/avatorImg.png';
import Baojing from './../../assets/img/alarmImg.svg';
// import Websocket from 'react-websocket';
// import mp3 from '@/assets/mp3/song.mp3';
// import {WebsocketHttp}from '@/server/service';
import './indexHead.css';

@connect(
  state=>({fishing:state.fishing,seaArea:state.seaArea,alarm:state.alarm}),
  { findFishingArea, alarmPendingListMock, newAlarmToast }
)
@withRouter
class IndexHead extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      alarmTotal: 0,
    }
    this.handelGoMyInfo = this.handelGoMyInfo.bind(this);
    this.handelGoNewsInfo = this.handelGoNewsInfo.bind(this);
  }

  componentDidMount() {
    // this.props.findFishingArea();
    // this.props.alarmPendingListMock();
  }

  handelGoMyInfo() {
    const { onOpenChange } = this.props;
    onOpenChange();
  }

  handelGoNewsInfo(){
    this.props.history.push('alarm');
  }
  
  handleGoNextPage(key) {
    this.props.history.push(key);
  }

  // onOpen=()=>{
    // console.log('websocket indexHead open')
  // }

  // onMessage =(res)=> {
  //   if(!_.isEmpty(res)){
  //     // console.log('收到消息推送')
  //     this.props.alarmPendingListMock()
  //     this.props.newAlarmToast()
  //     this.props.updateOnMessageToast()
  //     this.audioValue.play()
  //     setTimeout(() => {
  //       this.audioValue.pause()
  //       this.audioValue.load()
  //     }, 3000);
  //   }
  // }

  // onClose =()=> {
    // console.log('websocket indexHead close')
  // }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps____indexHead')
    // console.log(nextProps)
    // if(!_.isEmpty(nextProps)){
    //   if(!_.isEmpty(nextProps.alarm.alarmPendinglist)){
    //     this.setState({
    //       alarmTotal:nextProps.alarm.alarmPendinglist.length,
    //     })
    //   }else{
    //     this.setState({
    //       alarmTotal:0,
    //     })
    //   }
      // if(!_.isEmpty(nextProps.fishing)){
      //   setTimeout(() => {
      //     this.setState({
      //       alarmTotal:parseInt(nextProps.fishing.fishingAreaList.alarmCount),
      //     });
      //   }, 100);
      // }
    // }
  }

  render(){
    // let url = '';
    // let userId = '';
    // if(!_.isEmpty(JSON.parse(localStorage.getItem('user')))){
    //   userId = JSON.parse(localStorage.getItem('user')).id
    // };
    // let longitude = parseFloat(JSON.parse(sessionStorage.getItem('mapCenter'))[1]);
    // let latitude = parseFloat(JSON.parse(sessionStorage.getItem('mapCenter'))[0]);
    // const param = {
    //   "userId": userId,
    //   "longitude": longitude,
    //   "latitude": latitude,
    // };
    // let data = JSON.stringify(param);
    // url = `ws://${WebsocketHttp}websocket?param=`+encodeURIComponent(data);
    return (
      <div className='r-indexHead' style={{zIndex:999}}>
        <div className='indexHead-box'>
          <div className='indexHead-i' onClick={this.handelGoMyInfo}>
            <img width='32' height='32' className='indexHead-img' src={Wode} alt='head' />
          </div>
          <div className='indexHead-input'>APP</div>
          <div className='indexHead-r' onClick={this.handelGoNewsInfo}>
            <Badge text={this.state.alarmTotal} overflowCount={99} style={{right:this.state.alarmTotal>99?-30:-20}}>
              <img width='26' height='26' src={Baojing} alt='alarm' />
            </Badge>
          </div>
        </div>

        {/* {url !== '' ? (
          <Websocket
            reconnect
            url={url}
            onOpen={() => this.onOpen()}
            onMessage={res => this.onMessage(res)}
            onClose={() => this.onClose()}
          />
        ) : (
          ''
        )} */}
      {/* <audio
        ref={audio => {
          this.audioValue = audio;
        }}
        controls
        loop="loop"
        style={{ height:'1px', width:'1px' }}
      >
        <source src={mp3} type="audio/mpeg" />
        audio
      </audio> */}
      </div>
    )
  }
}

export default IndexHead;