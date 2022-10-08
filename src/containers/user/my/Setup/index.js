import React from 'react';
import { connect } from 'react-redux';
import Head from '@/components/head';
import history from '@/history';
import BScroll from 'better-scroll';
import Form from '@/components/form';
import { Button, Modal, List } from 'antd-mobile';
import { logoutSubmit, getUserInfo } from './../../../../redux/user/user.action';
@connect(
  state=>state.user,
  { logoutSubmit, getUserInfo  }
)
@Form
class Setup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleLogout = this.handleLogout.bind(this);
    // this.myWrapper = ref =>{this.myWrappers=ref};
  }
//   componentDidMount() {
//     this.initScroll();
//     this.props.getUserInfo();
//   }
  initScroll() {
    this.myScroll = new BScroll(this.myWrappers, {
      click: true
    });
  }

  handleBack() {
    history.goBack();
  }
  
  handlePush(e){
    this.props.history.push(`${e}`);
  }
  handleLogout(){
    const alert = Modal.alert
    alert('注销', '确认退出登录', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        localStorage.removeItem('nodeInstanceId')
        localStorage.removeItem('nodeInstancePassword')
        this.props.logoutSubmit();
        this.handlePush('login')
      }}
    ])
  }
  render(){
    const Item = List.Item;
    return (
      <div className='r-body'>
      <Head title='设置' handleBack={this.handleBack}></Head>
     
      <div className='about-content' style={{marginTop:"80px"}}>
         <Button className='btn logout' onClick={this.handleLogout}>退出登录</Button>
        </div> 
   
      </div>
    )
  }
}

export default Setup;