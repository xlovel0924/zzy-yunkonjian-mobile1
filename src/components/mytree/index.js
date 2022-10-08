import React, { Component } from 'react';
import FamilyTree from '@balkangraph/familytree.js';
import {withRouter} from "react-router-dom";
import "./index.css"

FamilyTree.templates.base.defs =
    ` 
        <g id="base_up">
            <circle  cx="-70" cy="7" r="10" fill="#fff" stroke="#b1b9be" stroke-width="1"></circle>
            ${FamilyTree.icon.ft(20, 80, '#b1b9be', -80, -35)}
        </g> 
     `;
FamilyTree.templates.myTemplate = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.myTemplate.size = [12,12];
FamilyTree.templates.myTemplate.node =
    '<circle cx="6" cy="6" r="6"  fill="none" stroke-width="1" stroke="#aeaeae">' +
    '</circle>'+
    '<line x1="2" y1="6" x2="10" y2="6" stroke="#aeaeae" stroke-width="1">' +
    '</line>' +
    '<line x1="6" y1="2" x2="6" y2="10" stroke="#aeaeae" stroke-width="1">' +
    '</line>';
FamilyTree.templates.myTemplate.plus =
    '<circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>'
    + '<line x1="0" y1="-11" x2="0" y2="11" stroke-width="1" stroke="#aeaeae"></line>';
FamilyTree.templates.myTemplate.minus =
    '<circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>';

FamilyTree.templates.myTemplate.defs = `
    <g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart"><path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/><g>
    
`;

FamilyTree.templates.myTemplate.ripple = {
    radius: 100,
    color: "#e6e6e6",
    rect: null
};
FamilyTree.templates.myTemplate.img_0 =
    '<circle cx="38" cy="40" r="29" stroke="#FF4777" fill="#fff" ></circle>'
    +'<clipPath id="ulaImg" fill="#000" >'
    + '<circle cx="38" cy="40" r="27"  ></circle>'
    + '</clipPath>'
    + '<image preserveAspectRatio="xMidYMid slice"  clip-path="url(#ulaImg)" xlink:href="{val}" x="12" y="12" width="54" height="54">'
    + '</image>';
FamilyTree.templates.myTemplate.field_0 = '<text style="font-size: 12px;" fill="#6B6B6B" x="40" y="90" text-anchor="middle">{val}</text>';
FamilyTree.templates.myTemplate.field_1 = '<text style="font-size: 12px;" fill="#6B6B6B" x="40" y="120" text-anchor="middle">{val}</text>';

// FamilyTree.templates.myTemplate.link =
//     '<path stroke="#686868" stroke-width="1px" fill="none" data-l-id="[{id}][{child-id}]" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';

// FamilyTree.templates.myTemplate.nodeMenuButton =
//     '<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" data-ctrl-n-menu-id="{id}">'
//     + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
//     + '</rect>'
//     + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
//     + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
//     + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
//     + '</g>';
//
// FamilyTree.templates.myTemplate.menuButton =
//     '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" data-ctrl-menu="">'
//     + '<hr style="background-color: rgb(255, 255, 40); height: 3px; border: none;">'
//     + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
//     + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
//     + '</div>';

// FamilyTree.templates.myTemplate.pointer =
//     '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">'
//     + '<polygon fill="rgb(255, 202, 40)" points="53.004,173.004 53.004,66.996 0,120" />'
//     + '<polygon fill="rgb(255, 202, 40)" points="186.996,66.996 186.996,173.004 240,120" />'
//     + '<polygon fill="rgb(255, 202, 40)" points="66.996,53.004 173.004,53.004 120,0" />'
//     + '<polygon fill="rgb(255, 202, 40)" points="120,240 173.004,186.996 66.996,186.996" />'
//     + '<circle fill="rgb(255, 202, 40)" cx="120" cy="120" r="30" />'
//     + '</g></g>';


FamilyTree.templates.myTemplate_male = Object.assign({}, FamilyTree.templates.myTemplate);
FamilyTree.templates.myTemplate_male.size = [75,100];

FamilyTree.templates.myTemplate_male.plus =
    '<circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>'
    + '<line x1="0" y1="-11" x2="0" y2="11" stroke-width="1" stroke="#aeaeae"></line>';
FamilyTree.templates.myTemplate_male.minus =
    '<circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>';

FamilyTree.templates.myTemplate_male.node = '<rect rx="10" ry="10" r="10" width="75" height="100" fill="#FFFFFF" stroke-width="1" stroke="#FFFFFF"></rect>';

FamilyTree.templates.myTemplate_male.defs = `
    <g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart"><path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/><g>
`;
FamilyTree.templates.myTemplate_male.img_0 =
    '<circle cx="38" cy="40" r="29" stroke="#00CBFF" fill="#fff" ></circle>'
    +'<clipPath id="ulaImg" fill="#000" >'
    + '<circle cx="38" cy="40" r="27"  ></circle>'
    + '</clipPath>'
    + '<image preserveAspectRatio="xMidYMid slice"  clip-path="url(#ulaImg)" xlink:href="{val}" x="12" y="12" width="54" height="54">'
    + '</image>';


FamilyTree.templates.myTemplate_female = Object.assign({}, FamilyTree.templates.myTemplate);
FamilyTree.templates.myTemplate_female.size = [75,100];
FamilyTree.templates.myTemplate_female.node = '<rect rx="10" ry="10" r="10"  width="75" height="100" fill="#FFFFFF" stroke-width="1" stroke="#FFFFFF"></rect>';

FamilyTree.templates.myTemplate_female.plus =
    '<circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>'
    + '<line x1="0" y1="-11" x2="0" y2="11" stroke-width="1" stroke="#aeaeae"></line>';
FamilyTree.templates.myTemplate_female.minus =
    '<circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>';

FamilyTree.templates.myTemplate_female.defs = `
    <g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart"><path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/><g>
`;
FamilyTree.templates.myTemplate_female.img_0 =
    '<circle cx="38" cy="40" r="29" stroke="#FF4777" fill="#fff" ></circle>'
    +'<clipPath id="ulaImg" fill="#000" >'
    + '<circle cx="38" cy="40" r="27"  ></circle>'
    + '</clipPath>'
    + '<image preserveAspectRatio="xMidYMid slice"  clip-path="url(#ulaImg)" xlink:href="{val}" x="12" y="12" width="54" height="54">'
    + '</image>';



@withRouter
class MyTree extends Component {

    constructor(props) {
        super(props);
        this.divRef = React.createRef();
        this.state = {
            nodes: []
        }
    }

     shouldComponentUpdate(nextProps, nextState, nextContext) {
         if(JSON.stringify(nextProps.nodes) !== JSON.stringify(nextState.nodes)){
             return true;
         } else {
             return false;
         }
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
         console.log("updated")
         // this.initFamily();
         this.loadNodes();
     }

    componentDidMount() {
        console.log("mounted")
       this.initFamily();
       

        // this.family.on("click",function (sender, args) {
        //     alert("添加成员")
        //     return false;
        // })
    }

    loadNodes = () => {
        this.family.load(this.props.nodes)
    }

     initFamily = () => {
         console.log(this.props.nodes,"这是")
         this.setState({
             nodes: [...this.state.nodes,...this.props.nodes]
         },() => {
             console.log(this.props.nodes,"执行完毕")
             console.log(this.state.nodes,"执行完毕")

              this.family = new FamilyTree (this.divRef.current , {
                 nodes: this.state.nodes,
                 mouseScrool: FamilyTree.action.none,
                 template: "myTemplate",
                 enableSearch: true,
                 nodeBinding: {
                     field_0: "name",
                     field_1: "relation",
                     img_0: "avatarUrl"
                 }, 
                 // menu: {
                 //     pdf: { text: "Export PDF" },
                 //     png: { text: "Export PNG" },
                 //     svg: { text: "Export SVG" },
                 //     csv: { text: "Export CSV" }
                 // },
             }); 
            // setTimeout(() => {
            //     this.family.center(this.props.match.params.nodeId)
            // },1000)
              this.family.on("click", (sender,args) => {
                  console.log(sender,"ete");
                  console.log(args,"eargs");
                  let id = args.node.id;
                  let nodes = sender.config.nodes;
                  for (let item of nodes){
                      if (item.id == id){
                          this.props.getId(item);
                          break;
                      } 
                  }

                  // this.props.history.push("/create-family-tree");
                  this.props.openOptionsModal();
                  return false
              }) 



             
             this.family.onField((args) => {
                 //return false; to cancel
                 // console.log(args,"args");
             });

            this.props.getFamily(this.family)

         });

    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}

export default MyTree
