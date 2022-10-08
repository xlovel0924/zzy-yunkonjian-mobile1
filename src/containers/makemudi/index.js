import { withRouter, Redirect } from 'react-router-dom'
import React, { Component } from 'react';
import Form from '@/components/form'
import { connect } from 'react-redux'
import _ from 'lodash'
import "./index.css"
import { appointments } from '@/redux/appointment/appointment.action.js'
import { Button, InputItem, Toast, Icon } from 'antd-mobile';
import indexTopBG from '@/assets/img/BG_login.png';
import kefu from '@/assets/img/homeimg/kefua.png';
import yuyue from '@/assets/img/homeimg/yuyue.png';

import DIY from '@/assets/img/homeimg/DIY.png';
@connect(
  state => state.user,
  { appointments }
)
@Form
@withRouter
class makemudi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personnelName: "",
      personnelPhone: "",
      idnumber: "",
      startTime: "",
      travelPartner: ""
    }

  }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handlePush(v) {
    if (v === "/login") {
      window.history.back(-1)
    }
    else {
      this.props.history.push(`${v}`)
    }

  }
  handleClick = () => {
  }
  handleLogin = () => {
    const { personnelName, personnelPhone, startTime,travelPartner } = this.state;

    const param = { personnelName,personnelPhone, startTime,travelPartner }
    this.props.appointments(param)

 
  }
  handleInputChange = (key, v) => {
    this.setState({
      [key]: v,
    })
  }
  render() {
    return (
      <div>
        <div className='makemudibackground'>
          <img src={indexTopBG} alt='bg' width='100%' />
          <div style={{ color: '#fff', position: 'absolute', top: '80px', width: '100%', fontSize: '29px', textAlign: 'center', fontWeight: 600, letterSpacing: '1px' }}>

          </div>
          <div
            style={{ color: '#fff', position: 'absolute', top: '36px', left: '12px' }}
            onClick={() => this.handlePush('/login')}
          >
            <Icon type='left' style={{ color: '#fff' }} size='lg' />
          </div>
        </div>
        <div className='makemudis'>
          <div className='makemudiheads' >预约看墓</div>
          <div className='makemudiForm'>
            <div className='makemuditext'>
              *姓名
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='personnelName'
                placeholder='请输入姓名'
                clear
                onChange={v => { this.props.handleChange('personnelName', v); this.handleInputChange('personnelName', v) }}
                // value={this.state.userId}
                labelNumber={5}
              >
              </InputItem>
            </div>
          </div>
          <div className='makemudiForm'>
            <div className='makemuditext'>
              *联系方式
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='phopersonnelPhonene'
                placeholder='18914854852'
                clear
                onChange={v => { this.props.handleChange('personnelPhone', v); this.handleInputChange('personnelPhone', v) }}
                // value={this.state.userId}
                labelNumber={5}
              >
              </InputItem>
            </div>
          </div>
          <div className='makemudiForm'>
            <div className='makemuditext'>
              *预约时间
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='startTime'
                placeholder='请选择预约时间'
                clear
                onChange={v => { this.props.handleChange('startTime', v); this.handleInputChange('startTime', v) }}
                // value={this.state.userId}
                labelNumber={5}
              >
              </InputItem>
            </div>
          </div>    <div className='makemudiForm'>
            <div className='makemuditext'>
              *同行人数
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='travelPartner'
                placeholder='请输入同行人数'
                clear
                onChange={v => { this.props.handleChange('travelPartner', v); this.handleInputChange('travelPartner', v) }}
                // value={this.state.userId}
                labelNumber={5}
              >
              </InputItem>
            </div>
          </div>
        </div>
        <button
          className="makemudibuttom"
          onClick={() => this.handleLogin()}
        >
          预约看墓
        </button>
        <div className='diymuxueindex'>
          <div onClick={() => this.handlePush('diymuxue')} >
            <img src={kefu} style={{ width: "18px", height: "18px" }}></img>
            <div style={{ color: ' #4DBAFB' }}>联系客服</div>
          </div>
          <div onClick={() => this.handlePush('Makemudi')} >
            <img src={yuyue} style={{ width: "18px", height: "18px" }}></img>
            <div>预约看墓</div>
          </div>
          <div onClick={() => this.handlePush('Diyinformation')}>
            <img src={DIY} style={{ width: "18px", height: "18px" }}></img>
            <div>我的diy</div>
          </div>
        </div>
      </div>
    );
  }
}

export default makemudi;
