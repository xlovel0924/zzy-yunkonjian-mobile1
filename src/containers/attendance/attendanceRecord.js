import React from 'react';
import { connect } from 'react-redux';
import BScroll from 'better-scroll';
import _ from 'lodash';
import moment from 'moment';
import {withRouter, Redirect, Link} from 'react-router-dom';
import { List } from 'antd-mobile';
import Head from '@/components/head';
import history from '@/history';
import { findSignList } from '@/redux/attendance/attendance.action';
import iconDingWeiDian from '@/assets/img/iconDingWeiDian.svg';
import noalarm from '@/assets/img/noAlarm.svg';
import form from '@/components/form';
import './attendanceRecord.css';

const Item = List.Item;
@connect(
  state=>({attendance:state.attendance, user:state.user}),
  { findSignList }
)
@withRouter
@form
class AttendanceRecord extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      signList:['1','2','3','4','5'],
    }
    this.taskWrapper = ref =>{this.taskWrappers=ref};
  }
  
  componentDidMount(){
    // 查询签到列表
    this.props.findSignList();
    this.initScroll();
  }

  initScroll() {
    this.taskScroll = new BScroll(this.taskWrappers, {
      click: true,
      probeType: 3
    });
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.attendance)){
        if(!_.isEmpty(nextProps.attendance.signInList)){
          // 创建打卡列表数据临时集合
           let tempList = []
          // 天集合
          let dayList = [];
          // 将同一天的数据合并

          // 循环原始数据
          nextProps.attendance.signInList.list.map(e=>{
            // 如果天日期不在天集合内
            if(!dayList.includes(e.signDate)){
              // 将日期添加到天集合,
              dayList.push(e.signDate);
              // 生成新元素添加到签到列表中
              const element = {date:e.signDate, list:[{address:e.address, functionType:e.functionType, signTime:e.signTime}]};
              tempList.push(element)
            }else{    // 日期在天集合内
              // 找到tempList中这一天 && list长度等于1 && functionType不等于当前functionType
              tempList.map((item,index)=>{
                if(item.date===e.signDate && item.list.length===1 && item.list[0].functionType!==e.functionType){
                  // 修改此数组元素(添加上/下班打卡记录)
                  const itemElement = {date:item.date, list:[item.list[0],{address:e.address, functionType:e.functionType, signTime:e.signTime}]}
                  tempList.splice(index,1,itemElement)
                }
              })
            }
          })
          tempList.sort(this.compare('date'))
          console.log(tempList)
          this.setState({
            // signList:nextProps.attendance.signInList.list
            signList: tempList
          })
        }else{
          this.setState({
            signList:[]
          })
        }
      }
    }
  }  

  handleBack() {
    history.goBack();
  }

  renderWorkTime=(e,index)=>{
    const { signInfo } = this.state;
    let startTime = '--:--';
    let endTime = '--:--';
    let startAddress = '-';
    let endAddress = '-';
    if(!_.isEmpty(e) && Array.isArray(e)){
      e.map(item=>{
        if(item.functionType==='1'){
          startTime = item.signTime;
          startAddress = item.address;
        }else if(item.functionType==='2'){
          endTime = item.signTime;
          endAddress = item.address;
        }
      })
    }
    return <div key={index}>
      <div className='signInfo' style={{marginBottom:27}}>
        <div className='signTime'>
          打卡时间:&nbsp;&nbsp;<span style={{color:'rgb(24,144,255)'}}>{startTime}</span>
        </div>
        <div className='signInAddress'>
          <img src={iconDingWeiDian} alt="icon" style={{verticalAlign:'sub', width:14, height:14}} />
            <span>&nbsp;&nbsp;{startAddress}</span>
        </div>
      </div>
      <div className='signInfo'>
        <div className='signTime'>
          打卡时间:&nbsp;&nbsp;<span style={{color:'rgb(24,144,255)'}}>{endTime}</span>
        </div>
        <div className='signInAddress'>
          <img src={iconDingWeiDian} alt="icon" style={{verticalAlign:'sub', width:14, height:14}} />
            <span>&nbsp;&nbsp;{endAddress}</span>
        </div>
      </div>
    </div>
  }

  // 排序
  compare=(prop)=>{
    return function(a,b){
      var value1 = moment(a[prop],'YYYY-MM-DD')
      var value2 = moment(b[prop],'YYYY-MM-DD')
      return value2-value1
    }
  }

  render(){
    const { 
      signList,
    } = this.state;
    // 测试排序, 修改数组
    // const a=[{id:5,name:'aa'},{id:7,name:'77'},{id:2,name:'zz'}]
    // a.sort(this.compare('id'))
    // a.splice(1,1,{id:'000'})
    // console.log(a)

    return (
      <div className='r-signList'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='打卡记录' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='signList-content' ref={this.taskWrapper}>
          <div>
            {
              _.isEmpty(signList)?
              <div className='message-tip'>
                <div>
                  <div className='nomessage-round'>
                    <img src={noalarm} alt='nowork' />
                  </div>
                </div>
                <div className='nomessage-text'>暂无打卡信息</div>
              </div>
              :
              signList.map((e,index)=>((
                <List key={index}>
                  <Item className='list-item' style={{marginBottom:0}} >
                    <div style={{fontSize:'15px', color:'#343434', fontWeight:600, marginBottom:6}}>
                      {moment(e.date,'YYYY-MM-DD').format('MM月DD日')}
                    </div>
                    <div style={{height:125, width:'100%'}}>
                      <div className='signLeft'>
                        <div style={{marginBottom:50}}>
                          开始考勤时间
                        </div>
                        <div>
                          结束考勤时间
                        </div>
                      </div>
                      <div className='signCenter'>
                        <div style={{width:10, height:10, borderRadius:'50%', backgroundColor:'#C6C6C6', marginTop:3}} />
                        <div style={{height:53, width:4, borderRight:'2px solid #c6c6c6', margin:'5px 0'}} />
                        <div style={{width:10, height:10, borderRadius:'50%', backgroundColor:'#C6C6C6'}} />
                      </div>
                      <div className='signRight'>
                        {this.renderWorkTime(e.list,index)}
                        
                        {/* <div className='signInfo' style={{marginBottom:27}}>
                          <div className='signTime'>
                            打卡时间:&nbsp;&nbsp;00:00
                          </div>
                          <div className='signInAddress'>
                            <img src={iconDingWeiDian} alt="icon" width={14} height={14} style={{verticalAlign:'sub'}} />
                              <span>&nbsp;&nbsp;ADDRESS</span>
                          </div>
                        </div>
                        <div className='signInfo'>
                          <div className='signTime'>
                            打卡时间:&nbsp;&nbsp;00:00
                          </div>
                          <div className='signInAddress'>
                            <img src={iconDingWeiDian} alt="icon" width={14} height={14} style={{verticalAlign:'sub'}} />
                              <span>&nbsp;&nbsp;ADDRESS</span>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </Item>
                </List>
              )))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default AttendanceRecord;