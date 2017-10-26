import React, { Component } from 'react';

class Avatar extends Component {
    constructor(props){
        super(props);
        this.state = {
          src: this.props.imgSrc,
          extension: this.props.imgExt
        };
    }

    componentDidMount(){
        console.log("Avatar mounted");
    }

    render() {
        var avatarStyle = {
            width:"30%",
            float:"left"
        }

        var imageStyle = {
            width: "60px",
            height: "60px",
            borderRadius: "35px"
        }
        
        return(
            <div style = {avatarStyle}>
                <img style = {imageStyle} src= { this.state.src + '.' + this.state.extension } />
            </div>);
      }
}

export default Avatar;