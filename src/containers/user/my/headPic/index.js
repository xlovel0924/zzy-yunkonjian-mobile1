import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Button }  from 'antd-mobile';
import Head from './../../../components/head';
import Form from './../../../components/form';
import headImg from './../../../assets/img/bg.png';
import history from './../../../history';
import _ from 'lodash';
import './headPic.css';
import Mavatar from 'mavatar'
let avatar;

@connect(
  state=>state.user
)
@Form
@withRouter
class HeadPic extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleBack() {
    history.goBack();
  }
  componentDidMount() {
    const {name} = this.props.userInfo;
    avatar = new Mavatar({
      el: '#avatar',
      backgroundColor: '#f00'
    });
    if(!_.isEmpty(name)){
      console.log("name1:"+name);
    }
    console.log("name:"+name);
  }
  handleClip = (e) => {
    avatar.imageClipper((dataurl) => {
      console.log(dataurl);
    });
  }
  handleReset = (e) => {
    avatar.resetImage();
  }
  render(){
    return (
      <div className='r-body'>
        <Head title='修改头像' handleBack={this.handleBack}></Head>
        <div className='headPic-content'>
          <div id="avatar" className='head-avatar'>
            <img src={headImg} alt='headImg' style={{width:'200px'}} />
          </div>
          <Button type='primary' className='head-btn' size='small'  onClick={this.handleClip}>裁剪</Button>
          <Button type='primary' className='head-btn' size='small' onClick={this.handleReset}>重置</Button>
        </div>
      </div>
    )
  }
}

export default HeadPic;