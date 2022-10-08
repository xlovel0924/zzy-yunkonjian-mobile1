import React, {Component} from 'react';
import "./index.css"
import Nav from "../../../components/nav/nav";
import { connect } from 'react-redux'


class Index extends Component {
    constructor() {
        super();
        this.state = {
            curr: 1
        }

        this.btnList = [
            {name: "是"},
            {name: "否"}
        ]
    }

    selectBtn = (index) => {
        console.log("点击了")
        this.setState({
            curr: index
        });
    }

    goCreateFamily = () => {
        this.props.history.push("/create-family")
    }


    render() {
        return (
            <div className="confirm">
                <Nav ellipsisIsShow={false} title="创建流程" className="pdlr-0" />
                <div className="center">
                    <div>您是否在至尊园或静园购墓？</div>
                    <div>请选择是否点击下一步进行云家谱创建</div>
                    <div>
                        {this.btnList.map((item,index) =>
                            <div key={index} className={this.state.curr === index ? 'select' : ''} onClick={() => this.selectBtn(index)}>
                                {item.name}
                            </div>
                        )}
                    </div>
                </div>
                <div className="next-btn" onClick={this.goCreateFamily}>下一步</div>
            </div>
        );
    }
}

export default Index;