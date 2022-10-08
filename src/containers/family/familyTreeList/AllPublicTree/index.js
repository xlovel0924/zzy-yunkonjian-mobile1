import React, {Component} from 'react';
import "./index.css"

import ListTemplate from "../ListTemplate"

class Index extends Component {
    // 关注
    concer = () => {

    }

    render() {
        return (
            <ListTemplate list={this.props.list}>
                <div onClick={this.concer}>+ 关注</div>
            </ListTemplate>
        );
    }
}

export default Index;