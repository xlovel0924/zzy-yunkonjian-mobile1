import React, {Component} from 'react';
// import FamilyTree from "@/components/mytree"
import "./index.css"
import FamilyTree from '@balkangraph/familytree.js';

class Index3 extends Component {

    componentDidMount() {
        console.log(FamilyTree.templates)
        var family = new FamilyTree(document.getElementById("tree"), {
            mouseScrool: FamilyTree.action.none,
            template: "myTemplate",
            enableSearch: false,
            nodeBinding: {
                field_0: "name",
                field_1: "phone",
                img_0: "photo"
            },
            nodeMenu: {
                details: { text: "Details" },
                edit: { text: "Edit" }
            },
            menu: {
                pdf: { text: "Export PDF" },
                png: { text: "Export PNG" },
                svg: { text: "Export SVG" },
                csv: { text: "Export CSV" }
            },
        });

        family.load([
            { id: 1, pids: [2], name: "Amber McKenzie", gender: "female", phone: "+7(863)354-67-14", photo: "https://cdn.balkan.app/shared/w60/3.jpg" },
            { id: 2, pids: [1], name: "Ava Field", gender: "male", phone: "+7(3952)67-30-48", photo: "https://cdn.balkan.app/shared/m60/3.jpg" },
            { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male", phone: "+7(4932)86-83-67", photo: "https://cdn.balkan.app/shared/m30/1.jpg" },
            { id: 4, mid: 1, fid: 2, name: "Savin Stevens", gender: "male", phone: "+7(351)121-01-17", photo: "https://cdn.balkan.app/shared/m30/2.jpg" },
            { id: 5, mid: 1, fid: 2, name: "Emma Stevens", gender: "female", phone: "+7(8652)97-73-24", photo: "https://cdn.balkan.app/shared/w30/5.jpg" }
        ]);
    }

    render() {
        return (
            <div style={{height:"100%"}}>
                <div id="tree">

                </div>
                {/*<FamilyTree nodes={[*/}
                {/*    { id: 1, pids: [2], name: "Amber McKenzie", gender: "female", img: "https://cdn.balkan.app/shared/2.jpg"  },*/}
                {/*    { id: 2, pids: [1], name: "Ava Field", gender: "male", img: "https://cdn.balkan.app/shared/m30/5.jpg" },*/}
                {/*    { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/2.jpg" },*/}
                {/*    { id: 4, mid: 1, fid: 2, name: "Savin Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/1.jpg"  },*/}
                {/*    { id: 5, mid: 1, fid: 2, name: "Emma Stevens", gender: "female", img: "https://cdn.balkan.app/shared/w10/3.jpg" }*/}
                {/*]} />*/}
                213213
            </div>
        );
    }
}

export default Index3;