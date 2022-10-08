import { withRouter, Redirect } from 'react-router-dom'
import React, { Component } from 'react';
import Form from '@/components/form'
import { connect } from 'react-redux'
import "./diyinformation.css"
import { appointmentsa } from '@/redux/appointment/appointment.action.js'
import { Button, InputItem, Toast, Icon } from 'antd-mobile';
import indexTopBG from '@/assets/img/BG_login.png';
import kefu from '@/assets/img/homeimg/kefua.png';
import yuyue from '@/assets/img/homeimg/yuyue.png';
import DIY from '@/assets/img/homeimg/DIY.png';
@connect(
  state => state.user,
  { appointmentsa }
)
@Form
@withRouter
class makemudi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      operationName: "",
      idnumber: "",
      // personnelId: "",
      phone: "",
      relation: "",

    }

  }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handlePush (v) {
    if(v==="/login"){
      window.history.back(-1)
    }
    else{
      this.props.history.push(`${v}`)
    }
 
  }
  handleClick = () => {
  }
  handleLogin = () => {


    const { name, operationName,phone,relation } = this.state;
    const param =  { name, operationName,phone,relation }
    if(param.name==""||param.operationName==""||param.phone==""||param.relation==""){
      console.log("456")
      Toast.fail('请输入完整信息');
    }else{
      console.log("123")
      this.props.appointmentsa(param)
      this.props.history.push(`mydiy`)
    }
    
 

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
          <div style={{color:'#fff', position:'absolute', top:'80px', width:'100%', fontSize:'29px', textAlign:'center', fontWeight:600, letterSpacing:'1px'}}>
     
          </div>
          <div 
            style={{color:'#fff', position:'absolute', top:'36px', left:'12px'}}
            onClick={()=>this.handlePush('/login')}
          >
            <Icon type='left' style={{color:'#fff'}} size='lg' />
          </div>
        </div>
        <div className='makemudi'>
       
          <div className='makemudihead' >填写信息</div>
          <div className='makemudiForm'>
            <div className='makemuditext'>
            操作人姓名：
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='operationName'
                placeholder='请输入姓名'
                clear
                onChange={v => { this.props.handleChange('operationName', v); this.handleInputChange('operationName', v) }}
                // value={this.state.userId}
                labelNumber={5}
              >
              </InputItem>
            </div>
          </div>
          <div className='makemudiForm'>
          <div className='makemuditext'>
          墓穴使用人：
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='name'
                placeholder='请输入使用人姓名'
                clear
                onChange={v => { this.props.handleChange('name', v); this.handleInputChange('name', v) }}
                // value={this.state.userId}
                labelNumber={5}
              >
              </InputItem>
            </div>
          </div>    <div className='makemudiForm'>
          <div className='makemuditext'>
          关系：
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='relation'
                placeholder='请添加关系'
                clear
                onChange={v => { this.props.handleChange('relation', v); this.handleInputChange('relation', v) }}
                // value={this.state.userId}
                labelNumber={5}
              >
              </InputItem>
            </div>
          </div>   <div className='makemudiForm'>
          <div className='makemuditext'>
          联系电话：
            </div>
            <div className='makemudiinput'>
              <InputItem
                type='phone'
                placeholder='请输入您的联系方式'
                clear
                onChange={v => { this.props.handleChange('phone', v); this.handleInputChange('phone', v) }}
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
            提交
          </button>
          <div className='diymuxueindex'>
                    <div onClick={() => this.handlePush('diymuxue')} >
                        <img src={kefu}  style={{width:"18px",height:"18px"}}></img>
                        <div style={{color:' #4DBAFB'}}>联系客服</div>
                    </div>
                    <div onClick={() => this.handlePush('Makemudi')} >
                        <img src={yuyue} style={{width:"18px",height:"18px"}}></img>
                        <div>预约看墓</div>
                    </div>
                    <div onClick={() => this.handlePush('Diyinformation')}>
                        <img src={DIY} style={{width:"18px",height:"18px"}}></img>
                        <div>我的diy</div>
                    </div>
                </div>
      </div>
    );
  }
}

export default makemudi;
