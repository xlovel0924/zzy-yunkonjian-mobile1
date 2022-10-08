import React from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import Head from './../../components/head';
import history from '@/history';
import { bind, clearBindSuccess, redirectToIndex, clearRedirect } from '@/redux/user/user.action';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import './camera.css';

@connect(
  state=>state.user,
  { bind, clearBindSuccess, redirectToIndex, clearRedirect }
)
@withRouter
class SeaCode extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleBack() {
    history.goBack();
  }

  handleTakePhoto =(dataUri)=> {
    // Do stuff with the photo...
    console.log('takePhoto');
    console.log(dataUri)
  }


  render(){

    return (
      <div className='r-camera'>
        { (this.props.redirectTo!==''&& this.props.redirectTo==='/login')? <Redirect to={this.props.redirectTo}/>:null}
        <Head title='海域编号' handleBack={this.handleBack} hasShadow={true}></Head>
        <div className='camera-content'>
          <Camera
            isFullscreen={true}
            onTakePhoto = { (dataUri)=>this.handleTakePhoto(dataUri) }
          />
        </div>
      </div>
    )
  }
}

export default SeaCode;