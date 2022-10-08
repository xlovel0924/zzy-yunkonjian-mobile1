import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, InputItem } from 'antd-mobile'
import _ from 'lodash'
import Form from '@/components/form'
import { login } from '@/redux/user/user.action'
import {isShow} from "@/redux/index/index.action"
import Register from "../register"
import LoginItem from "../loginItem"
import ForgetPwd from "../forgetPwd";
import VerifyLogin from "../Verifylogin"
// import indexTopBG from '@/assets/img/indexTopBG.png';
import yun3 from "../../../assets/img/yun3.png"
import yun4 from "../../../assets/img/yun4.png"
import './login.css'
import {number} from "echarts/src/export";
// const CheckboxItem = Checkbox.CheckboxItem;
@connect(
  state => ({...state.user,...state.indexReducer}),
  { login,isShow }
)
@Form
@withRouter
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      componentType: "Verifylogin"
      // showModal: false,
      // type: 'password',
      // password: '',
    }
    // this.handleEyeStatus = this.handleEyeStatus.bind(this)
  }

  // handleEyeStatus() {
  //   let flag = !this.state.eyeStatus;
  //   let temp;
  //   if (flag) { temp = 'text' } else { temp = 'password' }
  //   this.setState({
  //     eyeStatus: flag,
  //     type: temp
  //   })
  // }
  //
  // showModal = key => (e) => {
  //   e.preventDefault();// 修复 Android 上点击穿透
  //   this.setState({
  //     [key]: true,
  //   })
  // }

  changeComponent = (componentType) => {
    
    this.setState({
      componentType
    })
  }

  componentDidMount(){
    
    console.log(this.props,"ppo");
  }
  // 关闭弹窗
  closeLogin = () => {
    this.props.isShow(false)
  }


  render() {
    // const { remember } = this.state;
    // console.log(this.props.redirectTo);
    return (
      <>
        <div className='homeConten'>
          <div className='r-login' style={{ background: 'rgb(244,245,252)' }}>
          {(this.props.redirectTo !== '' && this.props.redirectTo !== '/login') ? <Redirect to={this.props.location.pathname} /> : null}
          <div className="page flex-col">
            <div className="section_1 flex-col">
              <div className="block_display">
              <div className="block_1 flex-col">
                <div onClick={this.closeLogin} className="block-close">×</div>
                {/*账号密码登录*/}
                {this.state.componentType === "Accountlogin" && <LoginItem changeComponent={this.changeComponent}/>}
                {/*注册*/}
                {this.state.componentType === "register" && <Register changeComponent={this.changeComponent} />}
                {/*手机号登录*/}
                {this.state.componentType === "Verifylogin" && <VerifyLogin  changeComponent={this.changeComponent} />}
                {/*忘记密码*/}
                {this.state.componentType === "forgetPwd" && <ForgetPwd changeComponent={this.changeComponent}/>}
              </div>
              </div>
            </div>
          </div>

        </div>
          {/* <div className="homePageBackground">  
            </div> */}
        </div>

      </>
    )
  }
}

export default Login