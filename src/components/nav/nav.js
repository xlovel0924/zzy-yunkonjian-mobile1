import React, {Component} from 'react';
import {Icon,Popover} from "antd-mobile";

import {withRouter} from 'react-router-dom';
import "./nav.css"

const Item = Popover.Item;
@withRouter
class Nav extends Component {

    static defaultProps = {
        ellipsisIsShow: true
    }

    constructor() {
        super();
        this.state = {
            visible: false
        }
    }

    gotoBack = () => {
        if (this.props.clearnFormData){
            this.props.clearnFormData()
        }
        console.log(this.props.goBackToOne);
        if (this.props.goBackToOne){
            console.log("走到");
            this.props.goBackToOne();
            return;
        }
        this.props.history.goBack();
    }

    onSelect = (node,index) => {
        // 一键分享
        if (node.props.value == "share"){
            this.props.shareToWeixin();
        }
        //关注我的人
        if (node.props.value === "focus_me"){
            this.props.history.push("/focus-me/" + this.props.match.params.id)
        }
        // 家谱修改
        if (node.props.value === "edit"){
            this.props.editFamily();
        }
        // 添加关系
        if (node.props.value === "add_relation"){
            this.props.clickModal();
        }
        // 查看关系
        if (node.props.value === "look_relation"){
            this.props.openListModal();
        }
        // 修改关系
        if (node.props.value === "edit_relation"){
            this.props.gotoEdit();
        }

        this.setState({
            visible: false
        });
    }
    render() {
        const { textColor } = this.props;
        return (
            <div style={{
                position: "relative"
            }}>
                <div className={`nav ${this.props.className}`}>
                    <Icon onClick={this.gotoBack} type="left" color={textColor?textColor:''} />
                    <div className="title" style={{color:textColor?textColor:''}}>{this.props.title}</div>
                    {
                        this.props.ellipsisIsShow ?
                            <Popover mask
                                     overlayStyle={{ color: 'currentColor' }}
                                     // visible={this.state.visible}
                                     overlay={this.props.overlay}
                                     align={{
                                         overflow: { adjustY: 0, adjustX: 0 },
                                         offset: [-10, 0],
                                     }}
                                     visible={this.state.visible}
                                     onSelect={this.onSelect}
                            >
                                <div style={{
                                    height: '100%',
                                    padding: '0 15px',
                                    marginRight: '-15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                    <Icon type="ellipsis" />
                                </div>
                            </Popover>
                            : <Icon style={{height:0}} type="left" />
                    }
                </div>
            </div>
        );
    }
}


export default Nav;