import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, Button, Modal, Toast } from 'antd-mobile';
import Head from './../../../components/head';
import history from './../../../history';
import { clearFishingArea } from '@/redux/fishingArea/fishingArea.action';
import { clearCameraList } from '@/redux/seaArea/seaArea.action';
import { clearAisList, clearArpaList } from '@/redux/ship/ship.action';
import { logoutSubmit } from '../../../redux/user/user.action';
import form from './../../../components/form';
import './index.css';
const Item = List.Item;

@connect(
  state=>({user:state.user}),
  { logoutSubmit, clearFishingArea,clearCameraList,clearAisList,clearArpaList }
)
@form
class System extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleBack() {
    history.goBack();
  }

  //退出弹出框
  handleLogout(){
    const alert = Modal.alert
    alert('注销', '确认退出登录', [
      { text: '取消',
      //  onPress: () => console.log('cancel')
       },
      { text: '确认', onPress: () => {
        this.props.logoutSubmit();
        this.props.clearFishingArea();
        this.props.clearCameraList();
        this.props.clearAisList();
        this.props.clearArpaList();
      }}
    ])
  }
//版本 清楚缓存弹出框
  handleVersionDetected(value){
    Toast.success(value,1)
  }

  render(){
    return (
      <div className='r-system'>{ (this.props.user.redirectTo!==''&&this.props.user.redirectTo==='/')? <Redirect to={this.props.user.redirectTo}/>:null}
        <Head title='系统设置' handleBack={this.handleBack}></Head>
        <div className='system-content'>
          <div className='system-circular'>
            <img className='circular-img' width='182px' height='62px'  alt='logo'/>
            <div className='circular-text' style={{color:'#666',fontSize:'18px'}}>当前版本信息</div>
            <div className='circular-text' style={{color:'#444',fontSize:'18px'}}>1.0V</div>
          </div>
          <List>
            <Item arrow="horizontal" onClick={()=>this.handleVersionDetected('已是最新版本')}>
              <span style={{color:'#666', fontSize:'14px'}}>
                版本检测
              </span>
            </Item>
            <Item arrow="horizontal" onClick={()=>this.handleVersionDetected('已清除缓存')}>
              <span style={{color:'#666', fontSize:'14px'}}>
                清除缓存
              </span>
            </Item>
          </List>
          <Button className='btn logout' style={{color:'#4661ff',border:'1px solid #4661FF'}} type='primary' onClick={()=>this.handleLogout()}>
            退出登录
          </Button>
        </div>
      </div>
    )
  }
}

export default System;