import React, { Component } from 'react';

class NoResults extends Component {
    constructor(props){
        super(props);
        this.state = {
          searchTerm: this.props.resultSearchTerm,
        };
    }

    render() {
        var noResultsStyle = {
            width:"30%",
            float:"left"
        }
        
        return(
            <div className="noResultsStyle" style = {noResultsStyle}>
                <h3>Oh No!</h3>
                <p>No results found for "{this.state.searchTerm}"</p>
            </div>);
      }
}

export default NoResults;