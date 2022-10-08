import React from 'react';
import { withRouter } from 'react-router-dom';
import { getUserInfo } from './../../redux/user/user.action';
import { connect } from 'react-redux';
@withRouter
@connect(
    null,
    {getUserInfo}
)
class LoginRoute extends React.Component{
    componentDidMount(){
        // console.log('检验');
        const publicList = ['/login','/register','/forgetPassword'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        this.props.getUserInfo();
    }

    render(){
        return null
    }
}

export default LoginRoute;