import React from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import { List} from 'antd-mobile';
import _ from 'lodash';
// import { alarmPendingListMock } from '../../../redux/alarm/';
import form from '@/components/form';
import laiyuan from '@/assets/img/ruquImg.svg';
import Shijian from '@/assets/img/timeImg.svg';
import noalarm from '@/assets/img/noAlarm.svg';
import enterAraeAlarm from '@/assets/img/enterAraeAlarm.svg';
// import chaosu from '@/assets/img/chaosu.png';
// import ruqu from '@/assets/img/ruqu.png';
// import kaojin from '@/assets/img/kaojin.png';
import './alarmProcessing.css';
const Item = List.Item;
const alarmType=['偷盗','入区','靠近','超速'];
                  //   红         紫        黄        绿
// const alarmColor = ['#fb6464','#a004c5','#ffaa43','#04c5b2'];

@connect(
  state=>state.alarm,
  { }
)
@form
class AlarmEvent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      alarmPendinglist:[],
      alarmValue:{},
    }
  }
  componentDidMount(){
    // this.props.alarmPendingListMock();
  }
//查看详情页面跳转功能
  handleGoDetailPage=(props,v)=>{
    const { updateGoDetailPage } = this.props;
    const url  = `${v}`
    // console.log(v)
    updateGoDetailPage(props,url);
  }
  render(){
    const { alarmPendinglist, props } = this.props;
    let alarmPendinglistReverse=[];
    if(!_.isEmpty(alarmPendinglist)){
      for (let i = alarmPendinglist.length-1; i >-1; i--) {
        alarmPendinglistReverse.push(alarmPendinglist[i]);
      }
    }
    return (
      <div className='alarmEvent-body'>
        <div className='alarmEvent-content'>
            <div className='tabs-item'>
              <div>
                {_.isEmpty(alarmPendinglistReverse)?
                <div>
                  <div className='nomessage-text'>暂无待处理信息</div>
                </div>:
                  alarmPendinglistReverse.map(e=>(
                    <List key={e.id} onClick={()=>this.handleGoDetailPage(props,e.id)}>
                      <Item className='item-list'>
                        <div className='item-left'>
                          <div className='item-list-img'>
                            <img className='list-img' src={enterAraeAlarm} alt='tip' />
                          </div>
                          <div className='alarm-type' style={{color:'#fb6464'}}>
                            {alarmType[1]}
                          </div>
                        </div>

                        <div className='item-list-content' style={{ paddingLeft:20,width:'calc(100% - 70px)', padding:'0' }}>
                          <div className='list-name' style={{padding:'19px 0 12px 0',margin:0, width:'95%'}}>
                            <span className='alarm-areaname'>&nbsp;{e.areaName}</span>
                            {/* <span className='ship-name'>{e.shipId}</span> */}
                          </div>
                          <div className='list-name'>
                            <span className='clock-img'>
                              <img src={laiyuan} alt='tip'/>
                            </span>
                            <span className='text-time'>
                              报警目标&nbsp;&nbsp;&nbsp;&nbsp;{e.mmsiId}
                            </span>
                          </div>
                          <div className='list-name' style={{marginTop:4}}><span className='clock-img'><img src={Shijian} alt='tip'/></span><span className='text-time'>报警时间&nbsp;&nbsp;&nbsp;&nbsp;{moment(e.createTime).format("YYYY-MM-DD HH:mm:ss")}</span></div>
                        </div>
                        {/* <div className='item-list-btn'> */}
                          {/* 跳转详情页确认 */}
                          {/* <div className='btn-acc' onClick={()=>this.handleGoDetailPage(props,e.id)}  style={{fontSize:"14px",marginTop:"60%",color: "#4661ff"}}>
                            查看详情 〉
                          </div> */}
                        {/* </div> */}
                      </Item>
                    </List>
                  ))
                }
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default AlarmEvent;