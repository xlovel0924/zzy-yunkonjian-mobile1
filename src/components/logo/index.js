import React from 'react';
import logoPng from './../../assets/img/logo.png';
import './logo.css';

class Logo extends React.Component{
  render(){
    return (
      <div className='r-logo'>
          <img className='logo-img' src={logoPng} alt='logo'/>
      </div>
    )
  }
}

export default Logo;