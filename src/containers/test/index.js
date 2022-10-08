import React from 'react';
import {withRouter} from 'react-router-dom'
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import Form from '@/components/form';
import {test} from '@/redux/ship/ship.action';
import './test.css';

let count = 7;
let testInterval;
@connect(
  state=>({ship:state.ship}),
  { test }
)
@Form
@withRouter
class Test extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      btnCanClick:true,
      countNum:5,
    }
  }

  componentDidMount(){
  }


  click=()=>{
    // const {btnCanClick} = this.state;
    // console.log('点击开始')
    if(count<15){
      this.setState({
        btnCanClick:false
      })
    }
    this.runTest();
    testInterval = setInterval(() => {
      if(count<15){
        this.runTest();
      }else{
        clearInterval(testInterval);
        // console.log('结束并清除定时器')
        this.setState({
          btnCanClick:true,
          countNum:5,
        })
        count = 5;
      }
    }, 15000);
  }

  runTest=()=>{
    if(count<15){
      this.props.test(this.state.countNum);
      count+=1;
      this.setState({
        countNum:count
      })
    }
  }
  componentWillReceiveProps(nextProps){
    // console.log('nextProps')
    // console.log(nextProps)
    if(!_.isEmpty(nextProps)){
      if(!_.isEmpty(nextProps.ship.test)){
        // console.log(nextProps.ship.test)
      }
    }
  }

  render(){
    const { btnCanClick } = this.state; 
    return (
      <div className='test'>
        <div className='test-box'>
          <Button className='btn' disabled={!btnCanClick} type='primary' onClick={this.click}>
            <span>{btnCanClick?'点击开始':`运行中`}</span></Button>
        </div>
        {/* <div style={{width:50, height:50,background:'#abc',position:'absolute', top:200,left:'calc(50% - 25px)'}} className={!btnCanClick?'rotateTest':''} /> */}
      </div>
    )
  }
}

export default Test;