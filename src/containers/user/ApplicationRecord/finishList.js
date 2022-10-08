import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
import _ from 'lodash';
import form from '@/components/form';
import moment from 'moment';
import renyuan from '@/assets/img/renyuan.svg';
import Shijian from '@/assets/img/timeImg.svg';
import noshenhe from '@/assets/img/shenhe.svg';
import yitongguo from '@/assets/img/yitongguoIMG.svg';
import weitongguo from '@/assets/img/weitongguoIMG.svg';
// import releaseAlarm from '@/assets/img/releaseAlarm.svg';
import './alarmFinish.css';

const Item = List.Item;
// const alarmType=['解除','已解除'];

@connect(
  state=>state.alarm,
  { }
)
@form
class ApplicationFinish extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      alarmPendinglist:[],
      alarmFinishlist:[],
    }
  }

  componentDidMount(){
  }
    //查看详情跳转功能
  handleGoDetailPage=(props,v)=>{
    const url = `${v}`
    const { updateGoDetailPage } = this.props;
    updateGoDetailPage(props,url);
  }

  render(){
    const {finishList} = this.props;
    let finishListReverse=[];
    if(!_.isEmpty(finishList)){
      for (let i = finishList.length-1; i >-1; i--) {
        finishListReverse.push(finishList[i]);
      }
    }
   
    return (
      <div className='alarmFinish-body'>
        <div className='alarm-content'>
            <div className='tabs-item'>
              <div>
                {_.isEmpty(finishListReverse)?
                <div className='message-tip'>
                  <div>
                    <div className='nomessage-round'>
                      <img src={noshenhe} alt='nowork' />
                    </div>
                  </div>
                  <div className='nomessage-text'>暂无已审核信息</div>
                </div>:
                //数据循环输出到列表
                  finishListReverse.map((e,index)=>(
                    <List key={index}>
                      <Item className='item-list'>
                        <div className='item-left'>
                          <div className='item-list-img'>
                            <img className='list-img' src={e.status==='2'?yitongguo:weitongguo} alt='tip' />
                          </div>
                          <div className='alarm-type' style={e.status==='2'?{color:'#04C5B2'}:{color:'#FB6464'}}>
                            {e.status==='2'?'已通过':'被驳回'}
                          </div>
                        </div>

                        <div className='item-list-content' style={{ paddingLeft:20,width:'calc(100% - 70px)', padding:'0' }}>
                          <div className='list-name'  style={{padding:'19px 0 12px 0',margin:0, width:'95%'}}>
                            <span className='ship-name' style={{}}>{e.seaAreaNumber}</span>
                          </div>
                         
                          <div className='list-name'>
                            <span className='clock-img'>
                              <img src={renyuan} alt='tip'/>
                            </span>
                            <span className='text-time'>
                              权利人&nbsp;&nbsp;&nbsp;&nbsp;{e.obligee}
                            </span>
                          </div>
                     
                           <div className='list-name'><span className='clock-img'><img src={Shijian} alt='tip'/></span><span className='text-time'>申请时间&nbsp;&nbsp;&nbsp;&nbsp;{moment(e.createTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                          <div className='list-name'><span className='clock-img'><img src={Shijian} alt='tip'/></span><span className='text-time'>审核时间&nbsp;&nbsp;&nbsp;&nbsp;{moment(e.finishTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>
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

export default ApplicationFinish;