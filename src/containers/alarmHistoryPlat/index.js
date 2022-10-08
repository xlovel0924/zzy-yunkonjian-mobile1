/* eslint-disable array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { findAisHistory, findHistory24h, clearAisHistory, showOtherShips } from '@/redux/ship/ship.action';
import {withRouter} from 'react-router-dom';
import { Toast } from 'antd-mobile';
import 'leaflet.chinatmsproviders';
// import { getNowFormatDate } from '../../utils/baseUtil';
import Head from '@/components/head';
import history from '@/history';
// import Modals from '@/components/Modals';
import './alarmHistoryPlat.css';

@connect(
  state=>({ ship:state.ship , fishing:state.fishing, alarm:state.alarm}),
  { clearAisHistory, findAisHistory, showOtherShips, findHistory24h }
)
@withRouter
class PlatAlarmHistory extends React.Component{
  static propTypes = {
		// device: PropTypes.object.isRequired
	}
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      modal: false,
      showHistory:true,
      aisHistory:[],
      // mapType: sessionStorage.getItem('mapType'),
      pointInfo: {},
      showModal: false,
      modalType:'',
      showPointInfo:false,
      alarmHistory:[],
      zoomValue:12,
    }
  }

  markerClick(v){
    this.setState({
      modalData: v,
      selectId: v.id,
    });
  }
  
  p(s) {
    return s < 10 ? '0' + s : s
  }

  componentDidMount() {
   
    // const id = this.props.match.params.id;
    
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps---------报警轨迹页')
    // console.log(nextProps)
  }

  componentWillMount(){
    
  }

  handleToast=()=>{
    Toast.fail("暂未开放",1.5)
  }

  handleBack=()=> {
    history.goBack();
  }
  
  render(){
    // console.log('alarmHistory')
    // console.log(alarmHistory)
    // if(!_.isEmpty(alarmHistory) && showHistory){
    //   this.showAlarmHistory()
    //   setTimeout(() => {
    //     this.setState({
    //       showHistory:false
    //     })
    //   }, 200);
    // }
    
    return (
      <div>
        <div className='r-alarm-history' style={{width: '100vw', height: '100vh', overflow:'hidden'}}>
          <Head title='历史轨迹' handleBack={this.handleBack} />
            <div style={{marginTop:100}}>历史轨迹</div>
        </div>
      </div>
    )
  }
}

export default PlatAlarmHistory;