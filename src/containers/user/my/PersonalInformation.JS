import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { InputItem, Picker, List, Modal } from 'antd-mobile';
import Head from './../../../components/head';
import history from './../../../history';
import Form from './../../../components/form';
import headPng from '@/assets/img/ocean.jpg';
import { updateUserName, updateUserInfo, getUserInfo } from '../../../redux/user/user.action';
import {district} from 'antd-mobile-demo-data';
import _ from 'lodash';
import './index.css';

const prompt = Modal.prompt;

@connect(
  state=>state.user,
  { updateUserName, updateUserInfo, getUserInfo }
)
@Form
@withRouter
class PersonalInformation extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeHeadPic = this.handleChangeHeadPic.bind(this);
  }

  componentDidMount(){
    this.props.getUserInfo();
  }
  //返回
  handleBack() {
    history.goBack();
  }
  //数据
  handleSex = (sex) => {
    const {address} = this.props.userInfo;
    this.props.updateUserInfo(sex[0],address);
  }
  //数据
  handleAddress = (address) => {
    this.props.updateUserInfo(sex,address.toString());
    const {sex} = this.props.userInfo;
  }
  //修改名称弹出框
  handleChange(){
    prompt('修改名称', '',
      [
        {
          text: '取消',
          onPress: value => new Promise((resolve) => {
            resolve();
          }),
        },
        {
          text: '确定',
          onPress: value => new Promise((resolve, reject) => {
            if (value !== '') {
              resolve();
              // const {id,mobilephone,sex,address} = this.props.userInfo;
              // console.log(mobilephone+"修改名称"+value);
              this.props.updateUserName(value);
            }
          }),
        },
      ], 'default', this.props.userInfo.userName, ['修改名称']);
  }
  //跳转页面
  handleChangeHeadPic(){
    this.props.history.push('/headpic');
  }
  render(){
    const {userName, mobilePhone, sex, address} = this.props.userInfo;
    const data=[ {label: '男',value: '0'},{label: '女',value: '1'}];
    let temp;let list=[];
    if(!_.isEmpty(address)){
      temp = address.split(",");
      temp.map((v)=>{
        return list.push(v);
      })
    }
    return (
      <div className='r-body'>
        <Head title='个人资料' handleBack={this.handleBack} hasShadow={true} ></Head>
        <div className='info-content'>
          <div className='info-input'>
            <div className='info-div'>
              <div className='avator-box'>
                <div className='rightArrow'>
                    
                  <i className='icon icon-back'></i>
                </div>
                <div className='avatorImg'>
                  <img width='50' height='50' src={headPng} alt='head' />
                </div>
                <InputItem editable={false} className='item-input-avator'
                ><span className='itemName'>头像</span></InputItem>
              </div>
              <InputItem editable={false} type='text' value={userName} clear className='item-input'
              onClick={this.handleChange}><span className='itemName'>昵称</span></InputItem>
              <InputItem editable={false} value={mobilePhone} className='item-input'
              extra='不可修改'><span className='itemName'>手机</span></InputItem>
            </div>       
            <div className='info-split border-1px' style={{fontSize:'11sp',color:'#666'}}>以下信息选填</div>
            <div className='info-div'>
              <Picker data={data} cols={1} className="forss"
              onOk={v => this.handleSex(v)} value={[sex]}>
                <List.Item arrow="horizontal"><span className='itemName'>性别</span></List.Item>
              </Picker>
              {/* <Picker data={district} className="forss"
              onOk={v => this.handleAddress(v)} value={list}>
                <List.Item arrow="horizontal"><span className='itemName'>地址</span></List.Item>
              </Picker> */}
            </div>
            {/* <div className='info-split border-1px'>选填信息将不在个人主页显示</div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default PersonalInformation;