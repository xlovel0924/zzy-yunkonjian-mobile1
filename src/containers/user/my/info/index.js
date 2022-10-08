import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { InputItem, Picker, List, Modal, Toast } from 'antd-mobile';
import Head from '@/components/head';
import history from '@/history';
import Form from '@/components/form';
import headImg from '@/assets/img/bg.png';
import { updateUserInfo,getUserInfo,depantmentInfo,postinfo} from './../../../../redux/user/user.action';
import {district} from 'antd-mobile-demo-data';
import { smallOwnersUrl } from '@/server/service';
import _ from 'lodash';
import './info.css';

const uploadUrl = smallOwnersUrl('nodeInstance/appUpload')
// console.log('uploadUrl')
// console.log(uploadUrl)

const prompt = Modal.prompt;

@connect(
  state=>state.user,
  { updateUserInfo,getUserInfo,depantmentInfo,postinfo}
)
@Form
@withRouter
class MyInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      userInfo:{},
      depatmentname:"",
      postname:"",
      // picUrl:require('D:/0.jpg'),
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeHeadPic = this.handleChangeHeadPic.bind(this);
    this.props.getUserInfo()
  }
  handleBack() {
    history.goBack();
  }
  componentDidMount(){
    // let user =localStorage.getItem('user');
    const user =  JSON.parse(localStorage.getItem('user'));
    this.props.depantmentInfo(user.key)
    this.props.postinfo(user.key)
  }
  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.userInfo)){
        this.setState({
          userInfo:nextProps.userInfo,
          userName:this.state.userInfo.userName,
          depatmentname:nextProps.depatmentname,
          postname:nextProps.postname,
        })
        this.forceUpdate();
      }else{
        this.setState({
          userInfo:{}
        })
      }
    }
  }

 
  // 姓名数据
  onInputChangename=(v)=>{
    this.setState({
      userName:v
    })
  }

  //姓名input离开事件
  nemeshow=()=>{
    this.props.updateUserInfo({cname: this.state.userName});
    setTimeout(() => {
      this.props.getUserInfo()
    }, 500);
  }
    //岗位
    onInputChangegw=(v)=>{
      // this.setState({
      //   // userName:v
      // })
    }
        //部门
    onInputChangebm=(v)=>{
      // this.setState({
      //   // userName:v
      // })
    }
    
  handleSex = (sex) => {
    const {id,mobilephone,name,address} = this.props.userInfo;
    this.props.update(id,mobilephone,name,sex[0],address);
  }
  handleAddress = (address) => {
    const {id,mobilephone,name,sex} = this.props.userInfo;
    this.props.update(id,mobilephone,name,sex,address.toString());
  }
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
              const {id,mobilephone,sex,address} = this.props.userInfo;
              console.log(mobilephone+"修改名称"+value);
              this.props.update(id,mobilephone,value,sex,address);
            }
          }),
        },
      ], 'default', null, ['修改名称']);
  }
  handleChangeHeadPic(){
    this.props.history.push('/headpic');
  }


  // 选择照片或拍照
  imagePicture=(_this)=> {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50, //图像的保存质量，范围0-100，100是最大值，最高的分辨率，没有任何压缩损失
        // eslint-disable-next-line no-undef
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,//指定图片来自拍照
        allowEdit: true,  //允许在选择图片之前进行简单的编辑
        correctOrientation: true, // 如果是横向拍摄的照片，会自动旋转到正确的方向
        saveToPhotoAlbum: true, // 备拍照后的图像是否保存的图片库中
        // eslint-disable-next-line no-undef
        destinationType: Camera.DestinationType.DATA_URL // 选择返回值的格式
      });
      function onSuccess(imageData) {
        console.log('data:image/jpeg;base64,+++++imageData---------')
        console.log('data:image/jpeg;base64,'+imageData)
        _this.props.updateUserInfo({mobile_picPath1: 'data:image/jpeg;base64,'+imageData});
        setTimeout(() => {
          _this.props.getUserInfo()
        }, 500);
      }
      function onFail(message) {
        Toast.info(message,5)
        // alert('取消: ' + message);
      }
  };


  render(){
    const {name, mobilephone, sex, address} = this.props.userInfo;
    const {userName, userInfo}=this.state;
 
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
        <Head title='个人资料' handleBack={this.handleBack}></Head>
        <div className='info-content'>
          <div className='info-input'>
            <div className='info-div'>
              {/* <Form> */}
                <InputItem editable={false} className='info-input'
                  onChange={(e)=>this.onchange(e)}
                  extra={<img onClick={()=>this.imagePicture(this)} src={!_.isEmpty(userInfo.mobile_picPath1)?userInfo.mobile_picPath1:headImg} alt='headImg'/>}
                >
                  头像
                </InputItem>
              {/* </Form> */}
              <InputItem 
              value=  {userName}
              onChange={this.onInputChangename}
              onBlur={this.nemeshow}
              >昵称</InputItem>
            
             <InputItem
              placeholder='岗位'
              onChange={this.onInputChangegw}
              value={this.state.postname[0]}
              extra='不可修改'
              editable={false} 
             >
              岗位
            </InputItem>
            <InputItem
              placeholder='部门'
              onChange={this.onInputChangebm}
              value=  {this.state.depatmentname[0]}
              extra='不可修改'
              editable={false} 
             >
              部门
            </InputItem>
            <InputItem editable={false} value={this.state.userInfo.mobileTel} className='info-input'
            extra='不可修改'>手机</InputItem>
            </div>       
           
         
          </div>
        </div>
      </div>
    )
  }
}

export default MyInfo;