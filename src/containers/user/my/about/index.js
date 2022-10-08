import React from 'react';
import { connect } from 'react-redux';
import Head from '@/components/head';
import history from '@/history';
import Form from '@/components/form';
import './about.css';
import helpt from './../../../../assets/img/helpt.png';
import leftback from './../../../../assets/img/leftback.png';
import rightback from './../../../../assets/img/rightback.png';
import { Button, Modal, List } from 'antd-mobile';
@connect(
  state=>state.user
)
@Form
class About extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleBack() {
    history.goBack();
  }
  render(){
    const Item = List.Item;
    return (
      <div className='r-body'>
      <Head title='考勤记录' handleBack={this.handleBack}></Head>
     
      <div className='about-content' style={{marginTop:"70px"}}>
      <List >
      <Item 
       extra={<div> <img  width='7' height='14' src={leftback} alt='head' />&nbsp;&nbsp; 2020.08&nbsp;&nbsp;<img  width='7' height='14' src={rightback} alt='head' /></div>}
      ><div className="brodercolor" style={{color:"#0088FE"}}>周</div><div className="brodercolor" style={{backgroundColor:'#0088FE',color:"#FFFFFF"}}>月</div></Item>
      <Item 
      // thumb={ewm}
      extra={<div>  <img width='17' height='17' src={helpt} alt='head' /> 月历</div>}
      >&nbsp;&nbsp;&nbsp;&nbsp;</Item>
      <Item 
      extra="22"
      >平均工时</Item>
      <Item 
      extra="22"
      >出勤天数</Item>
      <Item 
      extra="22"
      >休息天数</Item>
      <Item 
      extra="22"
      >迟到</Item>
      <Item 
      extra="22"
      >缺卡</Item>
      <Item 
      extra="22"
      >旷工</Item>
      </List>
        </div> 
   
      </div>
    )
  }
}

export default About;