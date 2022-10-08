import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
import BScroll from 'better-scroll';
import _ from 'lodash';
import form from '@/components/form';
import iconMail from '@/assets/img/iconMail.svg';
import { findNoticeDetail } from '@/redux/notice/notice.action';
import noalarm from '@/assets/img/noAlarm.svg';
import history from '@/history';
import bgPng from '@/assets/img/BG_my.png';
import iconMy from '@/assets/img/icon_my.png';
import './noticeDetail.css';

const Item = List.Item;

@connect(
  state=>({notice:state.notice}),
  { findNoticeDetail }
)

@form
class NoticeDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      noticeDetail:{}
    }
    
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }

  componentDidMount(){
    // if(!_.isEmpty(localStorage.getItem('user'))){
    //   this.props.findAllNotice({receiveID:JSON.parse(localStorage.getItem('user')).key});
    // }
    this.props.findNoticeDetail({id:this.props.match.params.id});
    this.initScroll();
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
    // console.log(this.alarmDetailScroll);
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.notice)){
        if(nextProps.notice.noticeDetail){
          this.setState({
            noticeDetail: nextProps.notice.noticeDetail
          })
        }
      }
    }
  }

  //返回功能
  handleBack=()=> {
    history.goBack();
  }

  render(){
    const { noticeDetail } = this.state;
   
    return (
      <div className='noticeDetail-body'>
        <div className='noticeDetail-head'>
          <img src={bgPng} width='100%' height={160} />
          <i className='noticeDetail-goback icon-back' onClick={this.handleBack}></i>
        </div>
        <div className='noticeDetail-title'>
          <div className='noticeDetail-titleText'>
            {noticeDetail.title}
          </div>
          <div className='noticeDetail-titleIssuer'>
            <img src={iconMy} width={10} height={12} alt='icon' />
            &nbsp;&nbsp;{noticeDetail.issuerName}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{noticeDetail.issuerDate}
          </div>
        </div>
        <div className='noticeDetail-content' ref={this.taskWrapper}>
          <div style={{width:'100%'}}>
            {noticeDetail.content}
          </div>
        </div>
      </div>
    )
  }
}

export default NoticeDetail;