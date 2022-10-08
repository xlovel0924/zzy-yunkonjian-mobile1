import React, {Component} from 'react';
import {Toast} from "antd-mobile";
import "./ConfirmModal.css"

class ConfirmModal extends Component {
    constructor() {
        super();
        this.state = {
            isAllow: false
        }
    }

    // 不同意
    notAllow = () => {
        this.setState({
            isAllow: false
        },() => {
            this.props.closeModal();
        });
    }

    // 同意
    allow = () => {
        if (this.state.isAllow){
            this.props.childrenAllow();
            this.props.closeModal();
        } else {
            Toast.fail("请勾选同意",1)
        }
    }

    changeAllow = () => {
        console.log("213")
        this.setState({
            isAllow: !this.state.isAllow
        });
    }

    render() {
        return (
            <div className="confirm-root">
                <div className="confirm-modal" >
                    <div className="confirm-top">欢迎使用云家谱</div>
                    <div className="confirm-content">为了更好地保护您的权益，同时遵守相关监管要求，我们将通过《隐私政策》向您说明我们会如何收集、存储、保护和使用您的信息。</div>
                    <div className="agreement" style={{
                        justifyContent: "center",
                        boxShadow: "0 0 0 0",
                        marginBottom: "25px"
                    }}>
                        <div>
                            <div
                                className={this.state.isAllow ? "yes yes-confirm-modal" : "yes"}
                                onClick={this.changeAllow}
                                style={{
                                    border: "1px solid #CF9D85"
                                }}
                            ></div>
                            <div className="is-confirm">查看并同意<span>《隐私政策》</span>及<span>《隐私政策》</span></div>
                        </div>
                    </div>
                    <div className="foot-btn">
                        <div onClick={this.notAllow}>不同意</div>
                        <div onClick={this.allow}>同意</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmModal;