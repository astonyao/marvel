import React, { Component } from 'react';

class CharacterInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: this.props.infoName,
          description: this.props.infoDescription
        };
    }

    componentDidMount(){
        console.log("CharacterInfo mounted");
    }

    render() {
        var charInfoStyle = {
            width: "60%",
            float:"right"
        }

        var descriptionStyle = {
            overflow:"auto",
            color:"hotpink",
            fontSize:"10px"
        }
        
        return(
            <div style = {charInfoStyle}>
                {/* <img style = {imageStyle} src= { this.state.src + '.' + this.state.extension } /> */}
                <p>{ this.state.name }</p>
                <p style = {descriptionStyle} >{ this.state.description }</p>
            </div>);
      }
}

export default CharacterInfo;