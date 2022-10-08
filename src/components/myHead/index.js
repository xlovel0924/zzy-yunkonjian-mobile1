import React from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import history from './../../history';
import bgPng from './../../assets/img/beijing@2x.png';
import headPng from './../../assets/img/bg.png';
import goback from './../../assets/img/goback.png';
import ewm from './../../assets/img/ewm.png';
import { getUserInfo } from '@/redux/user/user.action';
import './myHead.css';
@connect(
  state=>state.user,
  { getUserInfo }
)
@withRouter
class MyHead extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  handleBack(){
    history.goBack();
  }

  handlePush(e){
    this.props.history.push(`${e}`);
  }

  handleShowCode=()=>{
    this.props.showCode(true)
  }
  
  render(){
    // const { name, mobilephone} = this.props.userInfo;
    const{user}=this.props;
    const userAvatar = JSON.parse(localStorage.getItem('user')).mobile_picPath1
    return (
      <div className='header'>
        <div className='content-wrapper'>
          <div className='my-head'>
            <span className='head-title'></span>
          </div>
          <div>
          <div className='avatar' style={{height:"100px",float:"left",width:"100px"}}>
            <img width='66' height='66' className='avatar-img' src={!_.isEmpty(userAvatar)?userAvatar:headPng} alt='head' />
          </div>
          <div className='content' style={{width:"100px",float:"left",marginTop:"70px"}}>
            <div className='title'>
              <span className='name'> {user.userName}</span>
            </div>
            <div className='description'>
              {user.mobileTel}
            </div>
          </div>
          </div>
          <div style={{width:"60px",marginTop:"80px",float:"right", marginRight:20}}>
            <div style={{width:"20px",height:"20px",float:"right",cursor:"pointer"}}  onClick={() => this.handlePush('myinfo')}>  
              <img src={goback} alt='head' /> </div>
            <div style={{width:"20px",height:"20px",float:"left",cursor:"pointer"}} onClick={this.handleShowCode}>
               <img  src={ewm} alt='head' /></div>
          </div>
        </div>
        <div className='background'>
          <img src={bgPng} width='100%' height='100%' alt='bg'/>
        </div>
      </div>
    )
  }
}

export default MyHead;