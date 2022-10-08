import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { List } from 'antd-mobile';
import Head from '../../../components/head';
import history from '@/history';
import { getGridList, clearGridList, saveDeviceInfo } from '@/redux/task/task.action';
import { findDeviceList } from '@/redux/deviceLibrary/deviceLibrary.action';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '../../../components/form';
import './index.css';

const Item = List.Item;
@connect(
  state=>({deviceLibrary:state.deviceLibrary, task:state.task}),
  { findDeviceList, getGridList, clearGridList, saveDeviceInfo }
)
@withRouter
@form
class DeviceList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // new------------
      deviceList:[],
      gridList: [],
      isGetAllGrid: false,    // 是否已经获取全部网格(跳转时防止此页面请求接口)
      gridList: [],            // 每个设备的网格位置集合
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }
  componentWillMount(){
    this.props.clearGridList();
    this.props.saveDeviceInfo({});
  }
  componentDidMount(){
    const payload={
      current: 1,
      pageSize: 999,
      paramMap:{
        type: this.props.match.params.type,
        para1: this.props.match.params.para1
      },
      sortMap: {},
      token: localStorage.getItem('token'),
    }
    
    // 获取点位列表
    this.props.findDeviceList(payload);
    this.initScroll();
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
    // console.log(this.alarmDetailScroll);
  }

  handleBack() {
    history.goBack();
  }

  // 跳转页面
  handleGoNextPage(key) {
    this.props.history.push(key);
  };

  // 开关详情弹窗
  handleModal=(flag, record)=>{
    this.setState({
      taskInfoVisible: flag,
      taskRecord: record
    })
  }

  // 保存设备详情
  saveDeviceInfo=(e)=>{
    let devicePosition = []
    this.state.gridList.map(item=>{
      if(e.position===item.id){
        devicePosition = item.list
      }
    })
    e.devicePosition = devicePosition
    this.props.saveDeviceInfo(e)
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.deviceLibrary)){
        if(!_.isEmpty(nextProps.deviceLibrary.deviceList)){
          this.setState({
            deviceList:nextProps.deviceLibrary.deviceList.list
          })
          nextProps.deviceLibrary.deviceList.list.map((e,index)=>{
            if( nextProps.task.gridList.length < nextProps.deviceLibrary.deviceList.list.length && !this.state.isGetAllGrid ){
              this.props.getGridList(e.position, index)
            }else{
              this.setState({
                isGetAllGrid: true
              })
            }
          })
        }else{
          this.setState({
            deviceList:[]
          })
        }
        if(!_.isEmpty(nextProps.task.gridList)){
          this.setState({
            gridList: nextProps.task.gridList
          })
        }
      }
    }
  }

  // 获取网格数据
  getGridListData = (id) =>{
    const { gridList } = this.state;
    if(_.isEmpty(gridList)){
      return ['-']
    }else{
      let listData = ['-'];
      gridList.map(e=>{
        if(e.id === id){
          listData=e.list
        }
      })
      return listData
    }
  }
  

  render(){
    const { 
      deviceList,
    } = this.state;
    const serviceType = this.props.match.params.serviceType;
    return (
      <div className='r-deviceList'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='设备列表' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='deviceList-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(deviceList)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无作设备信息</div>
              </div>
              :
              deviceList.map((e,index)=>((
                <Link
                  to={`/librarydeviceinfo`}
                  key={`link${index}`}
                  onClick={()=>this.saveDeviceInfo(e)}
                >
                  <List key={index} 
                    // onClick={ ()=>this.handleGoNextPage(`pointdetail/${e.lineID}/${e.pointID}/${this.props.match.params.missionId}`) }
                  >
                    <Item className='list-item' style={{marginBottom:10}} >
                      <div style={{display: 'flex', justifyContent:'space-between', borderBottom:'1px solid #ccc', marginBottom:8}}>
                        <div style={{width:'calc(100% - 70px)', lineHeight:'32px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                          {e.seq}
                        </div>
                        <div style={{width:'calc(100% - 30px)', lineHeight:'32px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', textAlign:'right'}}>
                          {e.name}
                        </div>
                      </div>
                      <div style={{fontSize:'12px', color:'#666', marginBottom:5}}>
                        网格位置 :&nbsp;&nbsp;&nbsp;{this.getGridListData(e.position).join('/')}
                      </div>
                    </Item>
                  </List>
                </Link>
              )))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default DeviceList;