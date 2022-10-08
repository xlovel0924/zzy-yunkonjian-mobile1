import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Login from "./user/login"
import Home from './index'
import routerMap from './routerMap';
import {connect} from "react-redux";
import {isShow} from "@/redux/index/index.action"

@connect(
    state => ({indexReducer: state.indexReducer}),
    {isShow}
)
class Intercept extends Component {
    getRoute = () => {  
        const { pathname } = this.props.location;
        const { routerMap } = this.props;
        const token = window.localStorage.getItem("token");
        console.log(this.props,"pathname");
        const currRoute = routerMap.find(route => route.path.split("/")[1] === pathname.split("/")[1]);
        console.log(currRoute,"currRoute")

        if(!currRoute.auth){
            // return <Route path={currRoute.path} exact={currRoute.exact} component={() => <currRoute.component routerMap={routerMap}/>}  />
            return <Route path={currRoute.path} exact={currRoute.exact} render={(props) => {
                props.history.block( location => {
                    const { routerMap } = this.props;
                    console.log(location);
                    const currRoute = routerMap.find(route => route.path.split("/")[1] === location.pathname.split("/")[1]);
                    const token = window.localStorage.getItem("token");
                    if(!currRoute.auth){
                        return true;
                    } else {
                        if (token){
                            return true;
                        } else {
                            this.props.isShow(true)
                            return false;
                        }
                    }

                })
                return <currRoute.component routerMap={routerMap}/>
            } }  />
        } else {
            if (token){
                return <Route path={currRoute.path} exact={currRoute.exact} component={currRoute.component} routerMap={routerMap} />
            }
        }
    }

    render() {
        return (
            <> 
                {this.getRoute()}
            </>
        )
    }
}

export default Intercept;
