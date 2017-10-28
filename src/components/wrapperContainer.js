import React, { Component } from 'react';

class WrapperContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          left: this.props.wrapperLeft,
          right: this.props.wrapperRight,
          top: this.props.wrapperTop,
          width: this.props.wrapperWidth,
          height: this.props.wrapperHeight,
          maxHeight: this.props.wrapperMaxHeight,
          position: this.props.wrapperPosition,
          border: this.props.wrapperBorder,
          display: this.props.wrapperDisplay,
          overflow: this.props.wrapperOverflow,
          backgroundColor: this.props.wrapperBgcolor
        };
    }

    componentDidMount(){
        console.log("WrapperContainer mounted");
    }

    render() {
        var wrapperStyle = {
            left: this.state.left,
            right: this.state.right,
            top: this.state.top,
            width: this.state.width,
            height: this.state.height,
            maxHeight: this.state.maxHeight,
            position: this.state.position,
            border: this.state.border,
            overflow: this.state.overflow,
            backgroundColor: this.state.backgroundColor
        }
        
        return <div style = { wrapperStyle }>
            {this.props.children}
        </div>;
      }
}

export default WrapperContainer;