// import React, { Component } from "react";
// import { Modal, Slider, Button } from "antd";
// // import Draggable from "react-simple-draggable";
// import './cutEffect.css'

// const Success = Modal.success;
// const Error = Modal.error;

// class CutEffect extends Component {
//     constructor() {
//         super();
//         this.viewNode = React.createRef();
//         this.state = {
//             objStyles: { width: "auto", height: "auto" }, //首次渲染图片的显示样式
//             controled: {}, //可拖拽的范围
//             origin: { width: 0, height: 0 }, //第一次渲染图片后的图片的宽高
//             computed: { computedWidth: 0, computedHeight: 0 }, //第一次渲染图片后的图片的宽高
//             initPosition: { x: 0, y: 0 }, //初始拖拽的位置
//             value: 0, //滑动条的值
//             preRatio: 1, //前一次的放大缩小的  比例
//             draggedPosition: {
//                 x: 0,
//                 y: 0
//             }, //拖拽后的位置，仅传给后端
//             title: "修改成功！" //弹窗title
//         };
//     }
//     handleDrag(e) {
//         // console.log(this.state);
//         const { childNode } = this;
//         childNode.style.top = e.y + "px";
//         childNode.style.left = e.x + "px";
//         this.setState({
//             draggedPosition: e
//         });
//     }
//     setImageData(ratio) {
//         const {
//             viewNode: { current }
//         } = this;
//         const { preRatio } = this.state;
//         const { computedWidth, computedHeight } = this.state.computed;
//         let width = computedWidth * ratio;
//         let height = computedHeight * ratio;
//         this.setState(
//             () => {
//                 return {
//                     objStyles: { width, height }
//                 };
//             },
//             () => {
//                 let x, y;
//                 x = -((Math.abs(current.parentNode.offsetLeft) / preRatio) * ratio + 80 * (ratio - preRatio));
//                 y = -((Math.abs(current.parentNode.offsetTop) / preRatio) * ratio + 80 * (ratio - preRatio));
//                 if (x > 0) {
//                     x = 0;
//                 }
//                 if (y > 0) {
//                     y = 0;
//                 }
//                 if (preRatio > ratio) {
//                     //特殊位置处理  left
//                     if (current.offsetWidth - Math.abs(current.parentNode.offsetLeft) < 250) {
//                         x = -(current.offsetWidth - 250);
//                     }
//                     //特殊位置处理 top
//                     if (current.offsetHeight - Math.abs(current.parentNode.offsetTop) < 250) {
//                         y = -(current.offsetHeight - 250);
//                     }
//                 }
//                 let initPosition = {
//                     x: x,
//                     y: y
//                 };
//                 this.setState(() => {
//                     return {
//                         controled: {
//                             top: -(height - 250),
//                             left: -(width - 250),
//                             bottom: 0,
//                             right: 0
//                         },
//                         initPosition,
//                         draggedPosition: initPosition,
//                         preRatio: ratio
//                     };
//                 });
//             }
//         );
//     }
//     handleChange(val) {
//         const ratio = 1 + val;
//         this.setState(() => {
//             return {
//                 value: val
//             };
//         });
//         this.setImageData(ratio);
//     }
//     judgeProperty(target) {
//         //原始图片的尺寸
//         const imgObj = {
//             width: target.naturalWidth,
//             height: target.naturalHeight
//         };
//         //设置原始图片尺寸
//         this.setState({
//             origin: { width: target.naturalWidth, height: target.naturalHeight }
//         });
//         if (imgObj.width > imgObj.height) {
//             this.setState(() => {
//                 return {
//                     objStyles: { width: "auto", height: "100%" },
//                     controled: {
//                         top: 0,
//                         left: -((250 / imgObj.height) * imgObj.width - 250),
//                         bottom: 0,
//                         right: 0
//                     }
//                 };
//             });
//         } else if (imgObj.width < imgObj.height) {
//             this.setState(() => {
//                 return {
//                     objStyles: { width: "100%", height: "auto" },
//                     controled: {
//                         top: -((250 / imgObj.width) * imgObj.height - 250),
//                         left: 0,
//                         bottom: 0,
//                         right: 0
//                     }
//                 };
//             });
//         } else if (imgObj.width == imgObj.height) {
//             this.setState(() => ({
//                 objStyles: { width: "100%", height: "auto" },
//                 controled: { top: 0, left: 0, bottom: 0, right: 0 }
//             }));
//         }
//     }
//     getComputedImgProprety(target) {
//         const { width, height } = window.getComputedStyle(target);
//         this.setState(() => ({
//             computed: {
//                 computedWidth: parseFloat(width).toFixed(2),
//                 computedHeight: parseFloat(height).toFixed(2)
//             }
//         }));
//     }
//     async postData() {
//         const { draggedPosition, objStyles, computed, origin } = this.state;
//         const { onOK } = this.props;

//         let data = {
//             position: draggedPosition,
//             originSize: {
//                 width: origin['width'],
//                 height: origin['height'],
//             },
//             imgSize: {
//                 width: objStyles.width == "100%" || objStyles.width == "auto" ? parseInt(computed.computedWidth) : objStyles.width,
//                 height: objStyles.height == "100%" || objStyles.height == "auto" ? parseInt(computed.computedHeight) : objStyles.height
//             },
//             img: this.props.imgUrl
//         };
//         onOK && onOK(data)
//         this.props.closePost();
//     }
//     componentDidMount() {
//         setTimeout(() => {
//             this.initImage();
//         }, 0);
//     }
//     initImage() {
//         const { visible, imgUrl } = this.props;
//         const { childNode } = this;
//         childNode.onload = () => {
//             this.judgeProperty(childNode);
//             this.getComputedImgProprety(childNode);
//         };
//     }
//     reInitImage(target) {
//         if (target.isUpdate) {
//             this.setState(
//                 {
//                     objStyles: { width: "auto", height: "auto" },
//                     controled: {},
//                     initPosition: { x: 0, y: 0 },
//                     value: 0,
//                     computed: { computedWidth: 0, computedHeight: 0 },
//                     preRatio: 1,
//                     draggedPosition: {
//                         x: 0,
//                         y: 0
//                     }
//                 },
//                 () => {
//                     target.closeUpdate();
//                 }
//             );
//         } else {
//             const { childNode } = this;
//             Promise.resolve().then(() => {
//                 this.judgeProperty.call(this, childNode);
//                 this.getComputedImgProprety.call(this, childNode);
//             });
//         }
//     }
//     componentWillReceiveProps(pre, next) {
//         if (pre.isPost) {
//             this.postData();
//             return;
//         }
//         //初始化状态
//         if (pre.isCloseToUpdate && pre.isPost == this.props.isPost) {
//             this.reInitImage(pre);
//         }
//     }
//     successRender() {
//         const { title } = this.state;
//         const modal = Success({
//             title,
//             centered: true,
//             key: 1,
//             okText: "确定",
//             onOk: () => {
//                 this.props.closeCutting();
//                 modal.destroy();
//             }
//         });
//         setTimeout(() => {
//             modal.destroy();
//             this.props.closeCutting();
//         }, 3000);
//     }
//     errorRender() {
//         const modal = Error({
//             title: "未知错误！请稍后重试！",
//             centered: true,
//             key: 2,
//             okText: "确定",
//             onOk: () => {
//                 this.props.closeCutting();
//                 modal.destroy();
//             }
//         });
//         setTimeout(() => {
//             modal.destroy();
//             this.props.closeCutting();
//         }, 3000);
//     }
//     render() {
//         // console.log(this.props);
//         const { objStyles, controled, initPosition, value, draggedPosition } = this.state;
//         const { handleDrag } = this;
//         const { imgUrl } = this.props;
//         return (
//             <div className='model_wrap_sin'>
//                 <div className='model_wrap_cox'>
//                     <div className='model_wrap_cox_cen'>
//                         <div className='model_wrap_cox_ast'>
//                             <div className='model_wrap_liz'>
//                                 <div className='model_wrap_mas' />
//                                 <div className='model_wrap_lig'>
//                                     {/* <Draggable OnDragging={handleDrag.bind(this)} controled={controled} initPosition={initPosition}>
//                                         <img
//                                             src={imgUrl}
//                                             ref={this.viewNode}
//                                             onDragStart={e => e.preventDefault()}
//                                             style={{
//                                                 width: objStyles.width,
//                                                 height: objStyles.height
//                                             }}
//                                         />
//                                     </Draggable> */}
//                                 </div>
//                                 <div className='model_wrap_ligt'>
//                                     <img
//                                         src={imgUrl}
//                                         ref={ref => (this.childNode = ref)}
//                                         style={{
//                                             position: "relative",
//                                             top: draggedPosition.y,
//                                             left: draggedPosition.x,
//                                             width: objStyles.width,
//                                             height: objStyles.height
//                                         }}
//                                         data-ccc={initPosition.x}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/*<Slider*/}
//                 {/*  value={value}*/}
//                 {/*  tipFormatter={null}*/}
//                 {/*  disabled={false}*/}
//                 {/*  onChange={this.handleChange.bind(this)}*/}
//                 {/*  max={1}*/}
//                 {/*  min={0}*/}
//                 {/*  step={0.1}*/}
//                 {/*  style={{ width: "250px", margin: "15px auto" }}*/}
//                 {/*/>*/}
//             </div>
//         );
//     }
// }

// export default CutEffect;