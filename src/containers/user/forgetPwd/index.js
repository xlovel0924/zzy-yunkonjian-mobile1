import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {withRouter, Redirect} from 'react-router-dom'
import { Button, InputItem, Toast, Icon } from 'antd-mobile';
import { verifyMobilephone } from './../../../utils/baseUtil';
import Code from '@/components/code';
import Form from '@/components/form';
import indexTopBG from '@/assets/img/BG_login.png';
import iconPhone from '@/assets/img/icon_phone.png';
import iconPassword from '@/assets/img/icon_password.png';
import iconCode from '@/assets/img/icon_code.png';
import { register,forgetPassword } from '@/redux/user/user.action';
import './index.css';

@connect(
  state=>state.user,
  { register,forgetPassword }
)
@Form
@withRouter
class ForgetPwd extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      phoneStatus:false,
      showModal: false,
      eyeStatus:false,
      type:'password',
      remember:false,
      mobilePhone: '',
      password: '',
      confirmPassword: '',
      code:'',
      codeType:'2',
    }
    this.handleEyeStatus = this.handleEyeStatus.bind(this);
  }

  componentDidMount(){}

  componentWillUnmount(){
    // 解决内存泄漏问题
    this.setState = (state,callback)=>{
      return;
    };
  }
  
  handlePush(v){
    this.props.history.push(`${v}`);
  }

  handleEyeStatus(){
    let flag=!this.state.eyeStatus;
    let temp;
    if(flag){temp='text'}else{temp='password'}
    this.setState({
      eyeStatus:flag,
      type:temp
    })
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  handleInputChange = (key,val)=> {
    this.setState({
      [key]:val,
    })
    if(key==='mobilePhone'){
      let mobilePhone= val.replace(/\s/ig,"");
      if(mobilePhone!==''&&mobilePhone.length===11){
        if(verifyMobilephone(mobilePhone)){
          this.setState({
            phoneStatus:true
          })
        }else{
          this.setState({
            phoneStatus:false
          })
        }
      }else{
        this.setState({
          phoneStatus:false
        })
      }
    }
  }

  handleRegister=()=>{
    const {mobilePhone,password,confirmPassword,code} = this.state;
    if( !_.isEmpty(mobilePhone) && !_.isEmpty(password) && !_.isEmpty(confirmPassword) && !_.isEmpty(code) ){
      localStorage.removeItem('nodeInstanceId');
      this.props.forgetPassword(mobilePhone,password,confirmPassword,code);
    }else{
      Toast.info('请输入完整信息',1)
    }
  }

  render(){
    console.log('this.props.redirectTo')
    console.log(this.props.redirectTo)
    // const { remember } = this.state;
    return (
      <>
      {/*{ (this.props.redirectTo!==''&&this.props.redirectTo!=='/login')? <Redirect to='./login'/>:null}*/}
      {/*<div className="page flex-col">*/}
      {/*  <div className="section_1 flex-col">*/}
      {/*    <div className="block_1 flex-col">*/}
            <div className="text_1">忘记密码</div>
            <div style={{width:"80%", margin:"0 auto"}}>
              <InputItem
                type='phone'
                placeholder='请输入手机号码'
                clear
                autoComplete={false}
                onChange={v => { this.props.handleChange('mobilePhone', v); this.handleInputChange('mobilePhone', v) }}
                value={this.state.mobilePhone}
                labelNumber={5}
              >
              </InputItem>
              <div className="block_23 flex-col" />
              <InputItem type='text' placeholder='请输入验证码' className='input'
                autoComplete={false}
                onChange={v => { this.props.handleChange('code', v); this.handleInputChange('code', v) }}
                extra={<Code phone="form.userName" field={this.props.state} stateField={this.state} type="default"></Code>}>
              </InputItem>
              <div className="block_23 flex-col" />
              <InputItem
                type={this.state.type}
                clear
                autoComplete={false}
                placeholder='请输入密码(6-16位，区分大小写)'
                onChange={v => { this.props.handleChange('password', v); this.handleInputChange('password', v) }}
                value={this.state.password}
              >
              </InputItem>
              <div className="block_23 flex-col" />
              <InputItem
                type={this.state.type}
                clear
                autoComplete={false}
                placeholder='请确认密码'
                // extra={<i className={`icon ${this.state.eyeStatus ? 'icon-openeye' : 'icon-closeeye'}`}
                //   onClick={this.handleEyeStatus}></i>}
                onChange={v => { this.props.handleChange('password', v); this.handleInputChange('confirmPassword', v) }}
                value={this.state.confirmPassword}
              >
              </InputItem>
              <div className="block_23 flex-col" />
            </div>
            <button
              className="button_1 flex-col"
              onClick={() => this.handleRegister()}
            >
              修改
            </button>
            <div className="text-wrapper_1 flex-row justify-between">
              <span className="text_6" onClick={() => this.props.changeComponent('Verifylogin')}>快捷登录</span>
              <span className="text_7" onClick={() => this.props.changeComponent('Accountlogin')}>账号登录</span>
              <span className="text_7" onClick={() => this.props.changeComponent('register')}>注册账号</span>
            </div>
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>

    )
  }
}

export default ForgetPwd;