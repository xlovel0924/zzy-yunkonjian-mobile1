import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Head from './../../../components/head';
import history from './../../../history';
import form from './../../../components/form';
import { findApplicationList } from '../../../redux/user/user.action';
import UnprocessedList from './unprocessedList';
import BScroll from 'better-scroll';
// import { Badge } from 'antd-mobile';
import ApplicationFinish from './finishList';
import './alarm.css';

@connect(
  state=>state.user,
  { findApplicationList }
)
@form
class ApplicationRecord extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showAlarmModal: false,
      selectValue: 1,
      unprocessedList:[],
      finishList:[],
      finishTotal:0,
    }
    this.alarmWrapper = ref =>{this.alarmWrappers=ref};
  }

  componentDidMount(){
    this.props.findApplicationList([1])
    this.props.findApplicationList([2,3])
    this.alarmScroll = new BScroll(this.alarmWrappers, {
      click: true
    })
  }

//返回功能
  handleBack() {
    history.goBack();
  } 
//重新赋值selectValue,改变标签背景颜色    2017D21022417201
  handleChange=(value)=>{
    this.setState({
      selectValue: value,
    })
    if(value===1){
      this.props.findApplicationList([1])
    }else{
      this.props.findApplicationList([2,3])
    }
  }
//查看详情页面跳转
  updateGoDetailPage=(props,v)=>{
    props.history.push(`/alarmdetail/${v}`);
  }
  //接口数据处理赋值
  UNSAFE_componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps)){
      this.setState({
        unprocessedList: nextProps.unprocessedList,
        finishList: nextProps.finishList,
        finishTotal:nextProps.finishList.length,
      })
    };
  }

  render(){
    const { selectValue, unprocessedList, finishList, finishTotal } = this.state;


    return (
      <div className='applicationRecord-body'>
        <Head title='申请记录' handleBack={this.handleBack} style={{color:" #333333 ",fontsize:"17px"}}></Head>
        <div className='applicationRecord-content'>
          <div className='alarm-head'>
            <div className={selectValue===1?'alarm-head-name alarm-head-name-active':'alarm-head-name'}
             onClick={()=>this.handleChange(1)}>
                {/* <Badge text={alarmTotal} style={{color:"#fff",fontsize:"16px"}}> */}
                  <span style={selectValue===1?{fontWeight:600}:{fontWeight:200}}>
                    待审核
                  </span>
                {/* </Badge> */}
              </div>
            <div  className={selectValue===2?'alarm-head-name alarm-head-name-active':'alarm-head-name'}
            onClick={()=>this.handleChange(2)}>已审核({finishTotal})</div>
          </div>
          <div className='alarm-content-list'>
            <div className='content-list' ref={this.alarmWrapper}>
              <div>
                {/* /* 报警未处理页面 */ }
              {selectValue===1?<UnprocessedList unprocessedList={unprocessedList} props={this.props}
              updateGoDetailPage={this.updateGoDetailPage} />:
              /* 报警已处理页面 */
              <ApplicationFinish props={this.props} updateGoDetailPage={this.updateGoDetailPage} finishList={finishList} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ApplicationRecord;