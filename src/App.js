import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Logo from './components/logo'
import Avatar from './components/avatar'
import CharacterInfo from './components/characterInfo'
import WrapperContainer from './components/wrapperContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      previousQuery: '',
      data: [],
      inputValue: '',
      timeout: null,
      loader: false
    };
  }

  handleChange = (event) => {
    this.state.inputValue = event.target.value
    if(this.state.query != ''){
      this.state.previousQuery = this.state.query
    }
    var emptyQuery = this.state.inputValue
    /* Dynamic search result suggestion base on keystroke */
   if(this.state.timeout != null){
      clearTimeout(this.state.timeout)
        this.setState({
          ...this.state,
          emptyQuery,
          data: [],
          loader: false
        })
   }
    
    this.state.timeout = setTimeout(() => {
      var query = this.state.inputValue
      this.setState({
        ...this.state,
        previousQuery: query,
        loader: true
      })
      /* Prevent sudden change of input field: eg. Select all and delete */
      if(this.state.inputValue == ''){
        query = this.state.previousQuery
      }
      //TODO manage errors
      axios.get(`http://localhost:1111/characters?nameStartsWith=${query}`)
      .then((response) => {
        // console.log(response);
        this.setState({
          ...this.state,
          query,
          data: (response.data.results || []),
          loader: false
        })
      });
  }, 500);
  this.state.previousQuery = this.state.query
  }

  render() {
    const renderSugg = (data) => (data.map((el, index) => (
        <div key={index}>
          <WrapperContainer wrapperWidth="auto" wrapperHeight="80px" wrapperPosition="relative">
            <Avatar imgSrc={ el.thumbnail.path } imgExt={ el.thumbnail.extension }></Avatar>
            <CharacterInfo infoName={ el.name } infoDescription={ el.description }></CharacterInfo>
          </WrapperContainer>
      </div>
    )))
    const { data, query, loader } = this.state
    return <div>
      <WrapperContainer wrapperWidth="100%" wrapperHeight="100px" wrapperBgcolor="red">
          <Logo></Logo>
          <input className="searchBox" 
                 onChange={ this.handleChange } 
                 placeholder="Search..." 
                 />
          { loader ? <span className="loaderStyle"> loading </span> : null }
          <WrapperContainer className="suggestResults" wrapperPosition="absolute"
                            wrapperLeft="60%" wrapperTop="120px"
                            wrapperWidth="35%" wrapperHeight="400px" wrapperOverflow="auto">
            { (data.length == 0 && query !== '') ? <span> Oups </span> : <div>{renderSugg(this.state.data) }</div> }
          </WrapperContainer>
      </WrapperContainer>
     
   
    </div>;
  }
}

export default App;
