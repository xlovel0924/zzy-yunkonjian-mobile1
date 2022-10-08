import React, {Component} from 'react'
import Nav from '../../../components/nav/nav'
import "./index.css"
import HomeBackGround from "@/components/HomeBackGround"

import {queryTheirRootAllAxios} from "@/server/family.js";

class Index extends Component {

    constructor() {
        super();
        this.state = {
            rootDetail: {}
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        queryTheirRootAllAxios({id: this.props.match.params.id}).then(res => {
            if (res.data.status == 200) {
                this.setState({
                    rootDetail: res.data.data[0]
                });
            }
        })
    }

    render() {
        return (
            <div className="find-root-detail">
                <Nav title="追根溯源" className="prl-0" ellipsisIsShow={false}/>
                <HomeBackGround>
                    <div style={{
                        padding: "22px"
                    }}>
                        <div className="find-detail-content">

                            <div className="find-title">{this.state.rootDetail.name}</div>
                            <div dangerouslySetInnerHTML={{__html: this.state.rootDetail.synopsis}}></div>
                        </div>
                    </div>
                </HomeBackGround>

            </div>
        )
    }
}

export default Index
