import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, InputItem } from 'antd-mobile'
import _ from 'lodash'
import Form from '@/components/form'
import { Verifylogin } from '@/redux/user/user.action'
// import indexTopBG from '@/assets/img/indexTopBG.png';
import Code from '@/components/code'
import indexTopBG from '@/assets/img/BG_login.png'
import iconPhone from '@/assets/img/icon_phone.png'
import iconPassword from '@/assets/img/icon_password.png'
import './Verifylogin.css'

// const CheckboxItem = Checkbox.CheckboxItem;
@connect(
  state => state.user,
  { Verifylogin }
)
@Form
@withRouter
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      eyeStatus: false,
      type: 'password',
      remember: true,
      userId: '',
      password: '',
      mobilePhone: '',
    }
    this.handleEyeStatus = this.handleEyeStatus.bind(this)
  }

  componentDidMount () {
    // 判斷是否登錄名
    if (localStorage.getItem('userId') !== undefined && localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null) {
      this.setState({
        userId: localStorage.getItem('userId'),
      })
    }
    if (localStorage.getItem('password') !== undefined && localStorage.getItem('password') !== '' && localStorage.getItem('password') !== null) {
      this.setState({
        password: localStorage.getItem('password'),
      })
    }
    if (localStorage.getItem('password') !== undefined && localStorage.getItem('password') !== '' && localStorage.getItem('password') !== null
      && localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== undefined && localStorage.getItem('userId') !== null) {
      this.setState({
        remember: true,
      })
    }

  }

  // 登录
  handleLogin () {
    const { remember, userId, password, code,mobilePhone } = this.state
    console.log(this.state)
    if (!_.isEmpty(localStorage.getItem('userId')) && !_.isEmpty(localStorage.getItem('password'))) {
      const param = { smsCode: code, phone: userId }
      if (remember) {
        if (!_.isEmpty(userId) && !_.isEmpty(password)) {
          localStorage.setItem('userId', this.state.userId)
          localStorage.setItem('password', this.state.password)
        } else {
       
        }
        this.props.Verifylogin(param)
      } else {
      
        this.props.Verifylogin(param)
      }
    } else {
      const param = { smsCode: code, phone: mobilePhone,  }
      if (remember) {
        if (!_.isEmpty(userId) && !_.isEmpty(password)) {
          localStorage.setItem('userId', this.state.userId)
          localStorage.setItem('password', this.state.password)
        }
        this.props.Verifylogin(param)
      } else {
        this.props.Verifylogin(param)
      }
    }
  }

  // 跳转页面
  handlePush (v) {
    this.props.history.push(`${v}`)
  
  }

  handleEyeStatus () {
    let flag = !this.state.eyeStatus
    let temp
    if (flag) { temp = 'text' } else { temp = 'password' }
    this.setState({
      eyeStatus: flag,
      type: temp
    })
  }

  showModal = key => (e) => {
    e.preventDefault() // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    })
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }

  onChange = (flag) => {
    // this.setState({
    //   remember:!flag
    // })
  }

  handleInputChange = (key, v) => {
    this.setState({
      [key]: v,
    })
  }

  render () {
    // const { remember } = this.state;
    // console.log(this.props.redirectTo);
    return (
      <>
        {/*<div className='r-login' style={{ background: 'rgb(244,245,252)' }}>*/}
        {/*{(this.props.redirectTo !== '' && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null}*/}
        {/*<div className="page flex-col">*/}
        {/*  <div className="section_1 flex-col">*/}
        {/*    <div className="block_1 flex-col">*/}
              <div className="text_1">快捷登录</div>
              <div className="text_2"> <InputItem
                type='phone'
                placeholder='请输入手机号码'
                clear
                onChange={v => { this.props.handleChange('mobilePhone', v); this.handleInputChange('mobilePhone', v) }}
                value={this.state.mobilePhone}
                labelNumber={5}
              >
              </InputItem>
              </div>
              <div className="block_2 flex-col" />
              <div className="text_3">
                <InputItem
                  type='text' placeholder='请输入验证码' className='input'
                  onChange={v => { this.props.handleChange('code', v); this.handleInputChange('code', v) }}
                  extra={<Code phone="form.userName" field={this.props.state} stateField={this.state} type="default"></Code>}
                >
                </InputItem></div>
              <div className="block_3 flex-col" />
              <button
                className="button_1 flex-col"
                onClick={() => this.handleLogin()}
              >
                登录
              </button>
              <div className="text-wrapper_1 flex-row justify-between">
              <span className="text_6" onClick={() => this.props.changeComponent('Accountlogin')}>账号登录</span>
                  {/* <span className="text_6" onClick={() => this.handlePush('login')}>账号密码登录</span> */}
                  <span className="text_7" onClick={() => this.props.changeComponent('register')}>注册账号</span>
                  <span className="text_7" onClick={() => this.props.changeComponent('forgetPwd')}>忘记密码</span>
                </div>
              
            {/*</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
        
      </>


    )
  }
}

export default Login