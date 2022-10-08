import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './head.css';

@withRouter
class Head extends React.Component{
  static propTypes = {
		title: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);
    this.state={

    }
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    const { handleBack } = this.props;
    handleBack();
  }
  render(){
    return (
      <div className='r-head' style={{boxShadow:this.props.hasShadow?'0px 4px 4px #eee':''}}>
          <i className='icon icon-back' onClick={this.handleBack}></i>
          <span className='head-title'>{this.props.title}</span>
      </div>
    )
  }
}

export default Head;