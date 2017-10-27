import React, { Component } from 'react';

class WrapperContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          width: this.props.wrapperWidth,
          height: this.props.wrapperHeight,
          position: this.props.wrapperPosition,
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
            width: this.state.width,
            height: this.state.height,
            position: this.state.position,
            border:"1px solid hotpink",
            overflow: this.state.overflow,
            backgroundColor: this.state.backgroundColor
        }
        
        return <div style = { wrapperStyle }>
            {this.props.children}
        </div>;
      }
}

export default WrapperContainer;