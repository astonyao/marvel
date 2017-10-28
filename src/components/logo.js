import React, { Component } from 'react';
import logo from '../Marvel-logo.svg'

class Logo extends Component {
    constructor(props){
        super(props);
        this.state = {
          src: this.props.imgSrc,
        };
    }

    componentDidMount(){
        console.log("Logo mounted");
    }

    render() {
        var logoStyle = {
            width: "100px",
            position: "absolute",
            marginLeft:"15%",
            top:"50%",
            transform: "translateY(-50%)"
        }
        
        return(
            <div style = {logoStyle}>
                <img style = {logoStyle} src= { logo } />
            </div>);
      }
}

export default Logo;