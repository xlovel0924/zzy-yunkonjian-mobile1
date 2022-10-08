import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextareaItem, InputItem, Button } from 'antd-mobile';
import Head from './../../../components/head';
import history from '@/history';
import { customerSubmit } from '../../../redux/user/user.action';
import form from './../../../components/form';
import './index.css';

@connect(
  state=>state.user,
  { customerSubmit }
)
@form
class Service extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      myPhone:'',
      content:'',
    }
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.userInfo.mobilePhone)){
        this.setState({
          myPhone:nextProps.userInfo.mobilePhone
        })
      }
    }
  }

  handleBack() {
    history.goBack();
  }

  onChangePhone=(v)=>{
    this.setState({
      myPhone:v
    })
  }

  onChangeContent=(v)=>{
    this.setState({
      content:v
    })
  }

  handleSubmit = () =>{
    const { myPhone, content } = this.state;
    this.props.customerSubmit(myPhone, content)
    this.setState({
      content:'',
    });
    // this.handleBack();
  }

  render(){
    const { myPhone, content } = this.state
    
    return (
      <div className='r-customerService'>
        <Head title='联系客服' handleBack={this.handleBack} hasShadow={true} ></Head>
        <div className='service-content'>
          <TextareaItem placeholder='请描述你的问题···' value={content} rows={5} count={200} style={{touchAction:'none'}} onChange={(v)=>this.onChangeContent(v)} />
          <div className='bottom-line' />
          <div className='content-list-type-tip users-tip' style={{ color:'#666', fontSize:'12px' }}>留下你的联系方式</div>
          <InputItem labelNumber={4} value={myPhone} placeholder='请输入手机号' clear className='input' onChange={(v)=>this.onChangePhone(v)}>
            <div className='inputLine' />
            <span style={{ color:'#333'}}>
              手机号：
            </span>
          </InputItem>
          <div className='twoBtn'>
            <Button className='btn' style={{ background:'#4661ff' }} type='primary' onClick={this.handleSubmit} >提交</Button>
            <div className='btn-a' type='ghost'><a href="tel:021-52585968" style={{ color:'#4661FF' }}>拨打客服</a></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Service;