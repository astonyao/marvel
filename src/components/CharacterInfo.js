import React, { Component } from 'react';

class CharacterInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: this.props.infoName,
          description: this.props.infoDescription
        };
    }

    render() {
        var charInfoStyle = {
            width: "65%",
            float:"right",
            paddingRight: "10px",
            color:"rgb(90,100,128)"
        }

        var descriptionStyle = {
            overflow:"auto",
            color:"rgb(137,145,165)",
            fontSize:"10px",
            maxHeight:"24px",
            marginTop:"-12px"
        }

        var hidden = {
            display: "none"
        }

        var onlyName ={
            marginTop: "30px"
        }
        
        return(
            <div className="characterInfo" style = {charInfoStyle}>
                <p style = {(this.state.description) ? null : onlyName }>{ this.state.name }</p>
                <p className="characterdesc" style = {(this.state.description) ? descriptionStyle : hidden} >{ this.state.description }</p>
            </div>);
      }
}

export default CharacterInfo;