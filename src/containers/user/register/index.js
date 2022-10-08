import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, InputItem, Toast } from 'antd-mobile'
import _ from 'lodash'
import Code from '@/components/code'
import Form from '@/components/form'
import { register } from '@/redux/user/user.action'
// import indexTopBG from '@/assets/img/indexTopBG.png';
import './index.css'
// const CheckboxItem = Checkbox.CheckboxItem;
@connect(
  state => state.user,
  { register }
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
        // userId: localStorage.getItem('userId'),
      })
    }
    if (localStorage.getItem('password') !== undefined && localStorage.getItem('password') !== '' && localStorage.getItem('password') !== null) {
      this.setState({
        // password: localStorage.getItem('password'),
      })
    }
    if (localStorage.getItem('password') !== undefined && localStorage.getItem('password') !== '' && localStorage.getItem('password') !== null
      && localStorage.getItem('userId') !== '' && localStorage.getItem('userId') !== undefined && localStorage.getItem('userId') !== null) {
      this.setState({
        remember: true,
      })
    }

    // 如果localStorage内保存有userId和password,自动用这两个值进行登录
    if (localStorage.getItem('nodeInstancePassword') !== undefined && localStorage.getItem('nodeInstancePassword') !== '' && localStorage.getItem('nodeInstancePassword') !== null
      && localStorage.getItem('nodeInstanceId') !== '' && localStorage.getItem('nodeInstanceId') !== undefined && localStorage.getItem('nodeInstanceId') !== null) {
      console.log('自动登录')
      const param = { password: localStorage.getItem('nodeInstancePassword'), userId: localStorage.getItem('nodeInstanceId') }
      this.props.register(param)
    }
  }
  // 注册
  handleRegister = () => {
    const { mobilePhone, password, confirmPassword, code } = this.state
    console.log( " this.state",this.state)
    if (!_.isEmpty(mobilePhone) && !_.isEmpty(password) && !_.isEmpty(confirmPassword) && !_.isEmpty(code)) {
      this.props.register({ mobilePhone, password, confirmPassword, code })
    } else {
      Toast.info('请输入完整信息', 1.5)
    }
  }

  // 跳转页面
  handlePush(v) {
    this.props.history.push(`${v}`)

  }

  handleEyeStatus() {
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

  render() {
    // const { remember } = this.state;
    // console.log(this.props.redirectTo);
    return (
      <>
        {/*<div className='r-login' style={{ background: 'rgb(244,245,252)' }} >*/}
        {/*  {(this.props.redirectTo !== '' && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null}*/}
        {/*  <div className="page flex-col">*/}
        {/*    <div className="section_1 flex-col">*/}
        {/*      <div className="block_1 flex-col">*/}
                <div className="text_1">注册新的账号</div>
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
                  注册
                </button>
                <div className="text-wrapper_1 flex-row justify-between">
                  <span className="text_6" onClick={() => this.props.changeComponent('Verifylogin')}>快捷登录</span>
                   {/*<span className="text_7" onClick={() => this.handlePush('login')}>账号登录</span>*/}
                  <span className="text_7" onClick={() => this.props.changeComponent('Accountlogin')}>账号登录</span>
                  <span className="text_7" onClick={() => this.props.changeComponent('forgetPwd')}>忘记密码</span>
                  
                </div>
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

      </>


    )
  }
}

export default Login