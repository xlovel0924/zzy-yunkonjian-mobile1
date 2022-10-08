import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

@withRouter
class Monitor extends React.Component{

  render(){
    return (
      <div className='r-monitor'>
        监控
      </div>
    )
  }
}

export default Monitor;