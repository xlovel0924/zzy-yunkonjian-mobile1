import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Toast, Modal } from 'antd-mobile';
import { sendCode, notSended } from './../../redux/user/user.action';
import './code.css';

const alert = Modal.alert;
@connect(
  state=>state.user,
  { sendCode, notSended }
)
class Code extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sendOnce: true,
      sended: false,
      time: 60
    }
    this.timer = null;
  }
  componentDidMount(){
    clearInterval(this.timer);
  }

  componentWillUnmount(){
    // 解决内存泄漏问题
    this.setState = (state,callback)=>{
      return;
    };
  }

  componentWillReceiveProps(nextProps){
    // console.log('验证码')
    console.log(nextProps,"nextprops")
    if(!_.isEmpty(nextProps)){
      this.setState({
        sended:nextProps.sended
      })
    }
  }
  send = (stateField,field) => {
    console.log("stateField,field",this.props.user,"user")
    if(stateField){
      alert(
        '确定手机号',
        `发送验证码到${field.mobilePhone}`,
        [{ text: '取消',
        //  onPress: () => console.log('取消') 
        },
          { text: '确定', onPress: () => this.getVerifyCode(stateField,field) },],
        'ios'
      );
    }else {
      Toast.fail('请输入正确的手机号', 1);
    }
  }
  
  getVerifyCode(stateField,field){
    // this.setState({ sended: true });
    
    const {mobilePhone} =field;
    const {codeType} = stateField;
    // console.log('codeType')
    // console.log(codeType)
    this.props.sendCode({mobilePhone,codeType});
  }

  //倒计时
  tick=()=>{
    this.timer = setInterval(() => {
      if (this.state.time > 0) {
        this.setState(state => ({
          time: state.time -= 1,
        }));
      } else {
        clearInterval(this.timer);
        this.setState({ time: 60 });
        this.setState({
          sended: false,
          sendOnce: true,
         });
        this.props.notSended()
      }
    }, 1000);
  }


  render(){
    const { stateField, field } = this.props;
    const { sended, sendOnce } = this.state;
    if(sended && sendOnce ){
      this.tick()
      setTimeout(() => {
        this.setState({
          sendOnce: false
        })
      }, 200);
    }
    return (
      <div className='r-code'>
        <div className={sended?'ui-ver-code primary':'ui-ver-code default'}>
          {sended?
            <span>
              <span className="time">{this.state.time}s</span>后重新获取
            </span>
            :
            <span onClick={()=>this.send(stateField,field)} v-show='sended' style={{color:'#CF9D85', fontSize:'12px'}}>获取验证码</span>
          }
        </div>
      </div>
    )
  }
}

export default Code;