import React, {Component} from 'react';
import "./index.css"

import ListTemplate from "../ListTemplate"

class Index extends Component {
    constructor() {
        super();
    }

    concer = async () => {
        await this.props.addConcer({id: this.props.userInfo.id})
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