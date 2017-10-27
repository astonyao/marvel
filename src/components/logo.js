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
            top: "15px",
            position: "relative",
            left: "100px"
        }
        
        return(
            <div style = {logoStyle}>
                <img style = {logoStyle} src= { logo } />
            </div>);
      }
}

export default Logo;