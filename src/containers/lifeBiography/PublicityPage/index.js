import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

import './index.css';
import icon1 from '@/assets/img/life-biography/publicity-icon1.png';
import icon2 from '@/assets/img/life-biography/publicity-icon2.png';
import icon from '@/assets/img/life-biography/icon1.png'
import Nav from '@/components/nav/nav';

@withRouter
class BiographyPublicity extends Component {
    navigator = () => {
        this.props.history.push("/biography-home")
    }

    render() {
        return (
            // 生平传记 - 宣传页
            <div className="biography-publicity" onClick={() => this.navigator()}>
                <Nav ellipsisIsShow={false} />
                <div className="biography-publicity-icon">
                    <img src={icon} alt="icon" />
                </div>
            </div>
        )
    }
}

export default BiographyPublicity;