import React from 'react';
import { connect } from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom';
import { Button, InputItem } from 'antd-mobile';
import Head from '@/components/head';
import history from '@/history';
import { modifyPassword } from './../../../redux/user/user.action';
import form from '@/components/form';
import './modifyPassword.css';

@connect(
  state=>state.user,
  { modifyPassword }
)
@withRouter
@form
class ModifyPassword extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleModifyPassword = this.handleModifyPassword.bind(this);
  }
  handleBack() {
    history.goBack();
  }
  handleModifyPassword(){ 
    console.log(this.props.state,)
    localStorage.removeItem('nodeInstanceId');
    this.props.modifyPassword(this.props.state,this.props.userInfo.mobilephone);
  }
  render(){
    return (
      <div className='r-body'>
      { (this.props.redirectTo!==''&&this.props.redirectTo!=='/modifyPassword'&&this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='修改密码' handleBack={this.handleBack}></Head>
        <div className='modifyPassword-content'>
          <div className='forgetPassword-input'>
            <InputItem type='password' placeholder='请输入旧密码' clear className='input'
            onChange={v=>this.props.handleChange('password',v)}></InputItem>
            <InputItem type='password' placeholder='请输入新密码' className='input'
            onChange={v=>this.props.handleChange('password',v)}></InputItem>
            <InputItem type='password' placeholder='请确认密码' className='input'
            onChange={v=>this.props.handleChange('confirmPassword',v)}></InputItem>
          </div>
          <Button className='btn' type='primary'  onClick={this.handleModifyPassword}>更换密码</Button>
        </div>
      </div>
    )
  }
}

export default ModifyPassword;