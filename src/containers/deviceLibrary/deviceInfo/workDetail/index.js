import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
import _ from 'lodash';
import form from '@/components/form';
import moment from 'moment';
import laiyuan from '@/assets/img/ruquImg.svg';
import Shijian from '@/assets/img/timeImg.svg';
import noalarm from '@/assets/img/noAlarm.svg';
import releaseAlarm from '@/assets/img/releaseAlarm.svg';
import './index.css';

const Item = List.Item;
const alarmType=['解除','已解除'];

@connect(
  // state=>({ deviceLibrary:state.deviceLibrary }),
  // { findAll }
)
@form
class WorkDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      alarmPendinglist:[],
      alarmFinishlist:[],
    }
  }

  componentDidMount(){

  }

  // 查看详情跳转功能
  handleGoDetailPage=(props,v)=>{
    const url = `${v}`
    const { updateGoDetailPage } = this.props;
    updateGoDetailPage(props,url);
  }

  render(){
    const {alarmFinishlist,props} = this.props;
    let alarmFinishlistReverse=[];
    if(!_.isEmpty(alarmFinishlist)){
      for (let i = alarmFinishlist.length-1; i >-1; i--) {
        alarmFinishlistReverse.push(alarmFinishlist[i]);
      }
    }
   
    return (
      <div className='workDetail-body'>
        <div className='workDetail-content'>
            <div className='tabs-item'>
              <div>
                {_.isEmpty(alarmFinishlistReverse)?
                <div className='message-tip'>
                  <div>
                    <div className='nomessage-round'>
                      <img src={noalarm} alt='nowork' />
                    </div>
                  </div>
                  <div className='nomessage-text'>暂无工单信息</div>
                </div>:
                //数据循环输出到列表
                  alarmFinishlistReverse.map((e,index)=>(
                    <List key={index} onClick={()=>this.handleGoDetailPage(props,e.id)}>
                      <Item className='item-list'>
                        <div className='item-left'>
                          <div className='item-list-img'>
                            <img className='list-img' src={releaseAlarm} alt='tip' />
                          </div>
                          <div className='workDetail-type' style={{color:'#04C5B2'}}>
                            {alarmType[1]}
                          </div>
                        </div>

                        <div className='item-list-content' style={{ paddingLeft:20,width:'calc(100% - 70px)', padding:'0' }}>
                          <div className='list-name'  style={{padding:'19px 0 12px 0',margin:0, width:'95%'}}>
                            <span className='ship-name' style={{}}>{e.areaName}</span>
                          </div>
                         
                          <div className='list-name'>
                            <span className='clock-img'>
                              <img src={laiyuan} alt='tip'/>
                            </span>
                            <span className='text-time'>
                              报警目标&nbsp;&nbsp;&nbsp;&nbsp;{e.mmsiId}
                            </span>
                          </div>
                     
                          <div className='list-name'><span className='clock-img'><img src={Shijian} alt='tip'/></span><span className='text-time'>报警时间&nbsp;&nbsp;&nbsp;&nbsp;{moment(e.createTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                          <div className='list-name'><span className='clock-img'><img src={Shijian} alt='tip'/></span><span className='text-time'>解除时间&nbsp;&nbsp;&nbsp;&nbsp;{moment(e.finishTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                          <div className='list-name'>
                            <span className='clock-img'>
                              <img src={laiyuan} alt='tip'/>
                            </span>
                            <span className='text-time'>
                              备注信息&nbsp;&nbsp;&nbsp;&nbsp;{e.remark}
                            </span>
                          </div>
                        </div>
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

export default WorkDetail;