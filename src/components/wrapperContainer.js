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
          backgroundColor: this.props.wrapperBgcolor,
          borderRadius: this.props.wrapperBorderRadius,
          hoverable: this.props.wrapperHoverable,
          clickable: this.props.wrapperClickable,
          data: this.props.wrapperData
        };
    }

    mouseEnterHandler = (event) => {
        if(this.state.hoverable){
            this.setState({
                backgroundColor: "rgb(223,212,212)"
              })
        }
       
    }

    mouseLeaveHandler = (event) => {
        if(this.state.hoverable){
            this.setState({
                backgroundColor: "rgb(250,250,250)"
              })    
        }
    }

    // Log out hero's name in console
    clickHandler = (event) => {
        if(this.state.clickable){
            console.log(this.state.data);

        }
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
            borderRadius: this.state.borderRadius,
            overflow: this.state.overflow,
            backgroundColor: this.state.backgroundColor
        }
        
        return <div className="wrapperContainer" 
                    onMouseEnter={ this.mouseEnterHandler }
                    onMouseLeave={ this.mouseLeaveHandler }
                    onClick = { this.clickHandler }
                    style = { wrapperStyle }>
            {this.props.children}
        </div>;
      }
}

export default WrapperContainer;