import React, { Component } from 'react';

class Avatar extends Component {
    constructor(props){
        super(props);
        this.state = {
          src: this.props.imgSrc,
          extension: this.props.imgExt
        };
    }

    render() {
        var avatarStyle = {
            width:"30%",
            float:"left"
        }

        var imageStyle = {
            width: "50px",
            height: "50px",
            borderRadius: "35px",
            position: "absolute",
            top: "15px",
            left: "25px"
        }
        
        return(
            <div style = {avatarStyle}>
                <img style = {imageStyle} src= { this.state.src + '.' + this.state.extension } />
            </div>);
      }
}

export default Avatar;