import React, {Component} from 'react';
import {Modal} from "antd-mobile";
import {InputItem} from "antd-mobile";
import "./index.css"

class Index extends Component {
    constructor() {
        super();
        this.state = {
            value: ""
        }
    }


    static defaultProps = {
        modal: false,
        type: ""
    }

    reset = () => {
        this.setState({
            value: "",
        });
    }

    onOk = () => {
        this.props.setValue(this.props.type,this.props.value);
        this.reset();
        this.props.closeModal();
    }

    onCancel = () => {
        this.reset();
        this.props.closeModal();
    }

    getTitle = (type) => {
        switch (type) {
            case "name":
                return "姓名"
            case "phone":
                return "手机号"
            case "birthday":
                return "生日"
            case "originalAddress":
                return "祖籍"
            case "relationshipName":
                return "关系"
            default:
                return ""
        }
    }

    render() {

        return (
            <Modal
                visible={this.props.modal}
                transparent
                maskClosable={false}
                onClose={this.props.closeModal}
                title={"添加" + this.getTitle(this.props.type)}
                footer={[{text: "取消", onPress: this.onCancel},{ text: '确定', onPress: this.onOk}]}
            >
                <div className="add-modal">
                     <InputItem
                         className="add-input"
                         value={this.props.value}
                         onChange={e => this.props.setChildValue(e)}
                     />
                </div>
            </Modal>
        );
    }
}

export default Index;