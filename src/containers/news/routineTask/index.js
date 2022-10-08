// import React from 'react';
// import moment from "moment";
// import { connect } from 'react-redux';
// import { List} from 'antd-mobile';
// import _ from 'lodash';
// // import { alarmPendingListMock } from '../../../redux/alarm/';
// import form from '@/components/form';
// import laiyuan from '@/assets/img/ruquImg.svg';
// import Shijian from '@/assets/img/timeImg.svg';
// import noalarm from '@/assets/img/noAlarm.svg';
// import enterAraeAlarm from '@/assets/img/enterAraeAlarm.svg';
// // import chaosu from '@/assets/img/chaosu.png';
// // import ruqu from '@/assets/img/ruqu.png';
// // import kaojin from '@/assets/img/kaojin.png';
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
import _ from 'lodash';
import form from '@/components/form';
import iconMail from '@/assets/img/iconMail.svg';
import { findAllNotice } from '@/redux/notice/notice.action';
import noalarm from '@/assets/img/noAlarm.svg';
import './routineTask.css';

const Item = List.Item;

@connect(
  state=>({notice:state.notice}),
  { findAllNotice }
)
@form
class RoutineTask extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      allNotice: [],
    }
  }

  componentDidMount(){
    this.props.findAllNotice({receiveID:'all'});
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.notice)){
        if(!_.isEmpty(nextProps.notice.allNotice)){
          let tempNotice = []
          nextProps.notice.allNotice.map(e=>{
            if(e.type==='3'){
              tempNotice.push(e)
            }
          })
          this.setState({
            allNotice: tempNotice
          })
        }
      }
    }
  }

    //查看详情跳转功能
  handleGoDetailPage=(props,v)=>{
    const url = `${v}`
    const { updateGoDetailPage } = this.props;
    updateGoDetailPage(props,url);
  }

  render(){
    const {props} = this.props;
    const { allNotice } = this.state
   
    return (
      <div className='routineTask-body'>
        <div className='routineTask-content'>
            <div className='tabs-item'>
              <div>
                {_.isEmpty(allNotice)?
                <div className='message-tip'>
                  <div>
                    <div className='nomessage-round'>
                      <img src={noalarm} alt='nowork' style={{margin:'30px'}} />
                    </div>
                  </div>
                  <div className='nomessage-text'>暂无常规任务</div>
                </div>
                :
                //数据循环输出到列表
                allNotice.map((e,index)=>(
                    <List key={index} onClick={()=>this.handleGoDetailPage(props,e.id)}>
                      <Item className='item-list'>
                        <div className='item-left'>
                          <div className='item-mail'>
                            <img src={iconMail} alt='icon' width={22} height={12} style={{margin:'12px 10px'}} />
                          </div>
                        </div>
                        <div className='item-list-content'>
                          <div className='list-name'>
                            <div className='notice-name'>{e.name}</div>
                            <div style={{fontSize:'12px', color:'#999', lineHeight:'26px'}}>{e.issuerDate}</div>
                          </div>
                          <div className='noticeInfo'>
                            {e.content}
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

export default RoutineTask;