import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, InputItem } from 'antd-mobile'
import _ from 'lodash'
import Form from '@/components/form'
import { login } from '@/redux/user/user.action'
import Register from "../register"
// import indexTopBG from '@/assets/img/indexTopBG.png';
import yun3 from "../../../assets/img/yun3.png"
import yun4 from "../../../assets/img/yun4.png"
import './login.css'
import {number} from "echarts/src/export";
// const CheckboxItem = Checkbox.CheckboxItem;
@connect(
  state => state.user,
  { login }
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
    }
    this.handleEyeStatus = this.handleEyeStatus.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('userId') !== null && localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== null) {
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
    // 判断是否是微信登录
    // if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 || typeof navigator.wxuserAgent != "undefined") {
    //   window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=appId&redirect_uri=redirect_ur&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    //   localStorage.setItem('userId', "12313")
    //   localStorage.setItem('password', "password")
    // }
    // 如果localStorage内保存有userId和password,自动用这两个值进行登录
    if (localStorage.getItem('nodeInstancePassword') !== undefined && localStorage.getItem('nodeInstancePassword') !== '' && localStorage.getItem('nodeInstancePassword') !== null
      && localStorage.getItem('nodeInstanceId') !== '' && localStorage.getItem('nodeInstanceId') !== undefined && localStorage.getItem('nodeInstanceId') !== null) {
      console.log('自动登录')
      const param = { password: localStorage.getItem('nodeInstancePassword'), userId: localStorage.getItem('nodeInstanceId') }
      this.props.login(param)
    }
  }

  // 登录
  async handleLogin() {
    const { remember, userId, password } = this.state;
    // this.props.history.push(`/index`)
    if (!_.isEmpty(localStorage.getItem('userId')) && !_.isEmpty(localStorage.getItem('password'))) {
      const param = { password: password, userId: userId }
      if (remember) {
        if (!_.isEmpty(userId) && !_.isEmpty(password)) {
          localStorage.setItem('userId', this.state.userId)
          localStorage.setItem('password', this.state.password)
        } else {
          // localStorage.setItem('userId','')
          // localStorage.setItem('password','')
        }
        await this.props.login(param)
      } else {
        // localStorage.setItem('userId','')
        // localStorage.setItem('password','')
        await this.props.login(param)
      }
    } else {
      const param = { password: password, userId: userId }
      if (remember) {
        if (!_.isEmpty(userId) && !_.isEmpty(password)) {
          localStorage.setItem('userId', this.state.userId)
          localStorage.setItem('password', this.state.password)
        }
        await this.props.login(param)
      } else {
        // localStorage.setItem('userId','')
        // localStorage.setItem('password','')
        await this.props.login(param)
      }
    }
  }

  // 跳转页面
  handlePush(v) {
    this.props.history.push(`${v}`)
    // if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 || typeof navigator.wxuserAgent != "undefined") {
    //   // const url = encodeURI(`${myAPI}/`)

    // } else {
    //   window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=appId&redirect_uri=${v}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    // }
  }

  handleEyeStatus() {
    let flag = !this.state.eyeStatus;
    let temp;
    if (flag) { temp = 'text' } else { temp = 'password' }
    this.setState({
      eyeStatus: flag,
      type: temp
    })
  }

  showModal = key => (e) => {
    e.preventDefault();// 修复 Android 上点击穿透
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

  render() {
    // const { remember } = this.state;
    // console.log(this.props.redirectTo);
    return (
      <>
        {/*<div className='homeConten'>*/}
          {/*<div className='r-login' style={{ background: 'rgb(244,245,252)' }}>*/}
          {/*{(this.props.redirectTo !== '' && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null}*/}
          {/*<div className="page flex-col">*/}
          {/*  <div className="section_1 flex-col">*/}
          {/*    <div className="block_display">*/}
          {/*    <div className="block_1 flex-col">*/}
                {/*<Register />*/}
                <div className="text_1">账号登录</div>
                <div className="text_2">
                  <InputItem
                    type='phone'
                    placeholder='请输入手机号码'
                    clear
                    autoComplete="false"
                    onChange={v => { this.props.handleChange('userId', v); this.handleInputChange('userId', v) }}
                    value={this.state.userId}
                    labelNumber={5}
                  >
                  </InputItem>
                </div>
                <div className="block_2 flex-col" />
                <div className="text_3">
                  <InputItem
                    type={this.state.type}
                    clear
                    autoComplete="false"
                    placeholder='请输入密码'
                    // extra={<i className={`icon ${this.state.eyeStatus ? 'icon-eyeopen' : 'icon-eyeclose'}`}
                    //   onClick={this.handleEyeStatus}></i>}
                    onChange={v => { this.props.handleChange('password', v); this.handleInputChange('password', v) }}
                    value={this.state.password}
                  >
                  </InputItem>
                </div>
                <div className="block_3 flex-col" />
                <button
                  className="button_1 flex-col"
                  onClick={() => this.handleLogin()}
                >
                  登录
                </button>
                <div className="text-wrapper_1 flex-row justify-between">
                  <span className="text_6" onClick={() => this.props.changeComponent('Verifylogin')}>快捷登录</span>
                  <span className="text_7" onClick={() => this.props.changeComponent('register')}>注册账号</span>
                  <span className="text_7" onClick={() => this.props.changeComponent('forgetPwd')}>忘记密码</span>
                </div>

          {/*    </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

        {/*</div>*/}
          {/* <div className="homePageBackground">  
            </div> */}
        {/*</div>*/}

      </>
    )
  }
}

export default Login