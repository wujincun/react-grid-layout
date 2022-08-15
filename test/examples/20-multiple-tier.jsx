import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default class Tier extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);

    // const layout = this.generateLayout();
    this.state = { 
      layout:[
            {
                "x": 0,
                "y": 0,
                "w": 2,
                "h": 2,
                "i": "0",
                isDraggable:true
            },
            {
                "x": 2,
                "y": 0,
                "w": 2,
                "h": 5,
                "i": "1"
            },
            {
                "x": 4,
                "y": 0,
                "w": 12,
                "h": 6,
                "i": "2",
                // isDraggable:false
                static:true
            }

        ],
      layout1:[
        {
            "x": 0,
            "y": 0,
            "w": 2,
            "h": 2,
            "i": "3"
        },
        {
            "x": 2,
            "y": 0,
            "w": 2,
            "h": 4,
            "i": "4"
        }
      ]
     };
  }

  // generateDOM() {
  //   return _.map(_.range(this.props.items), function(i) {
  //     return (
  //       <div key={i}>
  //         <span className="text">{i}</span>
  //       </div>
  //     );
  //   });
  // }

  // generateLayout() {
  //   const p = this.props;
  //   return _.map(new Array(p.items), function(item, i) {
  //     const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
  //     return {
  //       x: (i * 2) % 12,
  //       y: Math.floor(i / 6) * y,
  //       w: 2,
  //       h: y,
  //       i: i.toString()
  //     };
  //   });
  // }

  // onLayoutChange(layout) {
  //   this.props.onLayoutChange(layout);
  // }
  onDrop(param,sourcelayout){
    console.log('sourcelayout',sourcelayout)
    console.log('param',param,)
  }
  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        // useCSSTransforms={true}
        // allowOverlap={true}
        isDroppable={true}
        onDrop={(...params)=>this.onDrop(params,this.state.layout)}
        isDetachable={true}
        {...this.props}
      >

        {
          this.state.layout.map((item,index)=>{
            return <div key={item.i} data-grid={item} style={{background:'#fff'}}>
              {
                index === 2 
                ? <ReactGridLayout
                    layout={this.state.layout1}
                    onLayoutChange={this.onLayoutChange}  
                    // useCSSTransforms={true}
                    // allowOverlap={true}
                    isDroppable={true}
                    onDrop={(...params)=>this.onDrop(params,this.state.layout1)}
                    isDetachable={true}
                    onDropDragOver={this.onDropDragOver}
                    {...this.props}
                  >
                    {this.state.layout1.map((citem,cindex)=>{
                      return <div key={citem.i} data-grid={citem} style={{background:'#f10'}}>
                        <span>{citem.i}</span>
                      </div>
                    })}
                  </ReactGridLayout>
                :<span className="text">{item.i}</span>
              }
            </div>
          })
        }
      </ReactGridLayout>
    );
  }
}

if (process.env.STATIC_EXAMPLES === true) {
  import("../test-hook.jsx").then(fn => fn.default(Tier));
}
