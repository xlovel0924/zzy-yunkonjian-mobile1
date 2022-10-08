import React, {Component} from 'react';
import FamilyTree from '@balkangraph/familytree.js';

FamilyTree.templates.tommy = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.tommy.size = [10, 20];
// FamilyTree.templates.tommy.min.img_0 = "";
// FamilyTree.templates.tommy.min.field_0 = '<text data-width="230" style="font-size: 18px;" fill="#ffffff" x="125" y="40" text-anchor="middle">{val}</text>';
//     FamilyTree.templates.tommy.min.field_1 = "";
//
// FamilyTree.templates.tommy_male.min = Object.assign({}, FamilyTree.templates.tommy.min);

FamilyTree.templates.tommy.img_0 =
    '<clipPath id="ulaImg">'
    + '<circle cx="39" cy="40" r="27"></circle>'
    + '</clipPath>'
    + '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="-10" y="5" width="90" height="80">'
    + '</image>';

console.log(FamilyTree.templates.tommy,"log")

// FamilyTree.templates.tommy.field_0 = '<text style="font-size: 12px;" fill="#ffffff" x="40" y="90" text-anchor="middle">{val}</text>';
// FamilyTree.templates.tommy.field_1 = '<text style="font-size: 12px;" fill="#ffffff" x="50" y="150" text-anchor="middle">{val}</text>';


// FamilyTree.templates.tommy_male.size = [75,100];
FamilyTree.templates.tommy_male.node = '<rect x="0" y="0" height="100" width="75" stroke-width="1" fill="#039BE5" stroke="#aeaeae" rx="7" ry="7"></rect>';
// FamilyTree.templates.tommy_female.min = Object.assign({}, FamilyTree.templates.tommy.min);
// FamilyTree.templates.tommy_female.size = [75,100];
FamilyTree.templates.tommy_female.node = '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="#F57C00" stroke="#aeaeae" rx="7" ry="7"></rect>';


class Index2 extends Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.family = new FamilyTree (this.divRef.current , {
            nodes: this.props.nodes,
            enableSearch: false,
            nodeBinding: {
                field_0: "name",
                img_0: "img"
            }
        });

        this.family.on("click",function (sender, args) {
            console.log(sender,"sendder");
            console.log(args,"args");
            if (args.node.min) {

                sender.maximize(args.node.id);
            }
            else {
                sender.minimize(args.node.id);
            }
            return false;
        })
    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}

export default Index2;