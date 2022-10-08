import React, {Component} from 'react';
import "./index.css"

import ListTemplate from "../ListTemplate"

class Index extends Component {
    render() {
        return (
            <ListTemplate list={this.props.list}>
                <div >已关注</div>
            </ListTemplate>
        );
    }
}

export default Index;