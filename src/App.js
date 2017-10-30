import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MediaQuery from 'react-responsive'
import NoResults from './components/NoResults'
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
      showOuterWrapper: false,
      loader: false
    };
  }

  handleChange = (event) => {
    this.state.inputValue = event.target.value
    if(this.state.query != ''){
      this.setState({
        previousQuery: query
      })
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
    
    var query = this.state.inputValue
    this.setState({
      ...this.state,
      previousQuery: query,
      loader: true
    })
    /* Prevent sudden change of input field: eg. Select all and delete */
    if(this.state.inputValue == ''){
      this.setState({
        query: this.state.previousQuery,
        showOuterWrapper: false
      })
    }
    this.setState({
      previousQuery: query
    })
    this.callApi(query)
  }

  callApi = (query) => {
    //TODO manage errors
    this.state.timeout = setTimeout(() => {
      axios.get(`http://localhost:1111/characters?nameStartsWith=${query}`)
      .then((response) => {
        if(this.state.inputValue==''){
          this.setState({
            showOuterWrapper: false
          })
        }else{
          this.setState({
            showOuterWrapper: true
          })
        }
        // console.log(response);
        this.setState({
          ...this.state,
          query,
          data: (response.data.results || []),
          // showOuterWrapper: true,
          loader: false
        })
      });
    }, 500);
  }
  
  render() {
    const renderSugg = (data) => (data.map((el, index) => (
        <div key={index}>
          <WrapperContainer 
              wrapperHoverable = 'true' wrapperClickable = 'true' wrapperData = { el.name }
              wrapperWidth="auto" wrapperHeight="80px" wrapperPosition="relative" 
              wrapperBorder="1px solid rgb(216,216,216)" wrapperBgcolor="rgb(250,250,250)"
           >
            {/* TODO : Replace the dummy image */}
            <Avatar imgSrc={ el.thumbnail.path == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? "https://cdn.browshot.com/static/images/not-found" : el.thumbnail.path } 
                    imgExt={ el.thumbnail.extension }></Avatar>
            <CharacterInfo infoName={ el.name } infoDescription={ el.description }></CharacterInfo>
          </WrapperContainer>
      </div>
    )))
    const { data, query, loader } = this.state
    return <div>
      <WrapperContainer wrapperWidth="100%" wrapperHeight="80px" wrapperBgcolor="rgb(229,37,47)" wrapperPosition="relative" >
          {/* Desktop View */}
          <MediaQuery query="(min-width: 500px)">
          <Logo></Logo>
          <input id="searchBox" className="searchBox" onChange={ this.handleChange } 
                 placeholder="Search..." 
                 />
                 { loader ? <div className="loader"></div> : null }
            { this.state.showOuterWrapper ?
            <WrapperContainer className="suggestResults" wrapperPosition="absolute"
                              wrapperRight="22%" wrapperTop="60px" wrapperMaxHeight="400px"
                              wrapperWidth="350px" wrapperHeight="auto" wrapperOverflow="auto"
                              wrapperBorder= "1px solid rgb(216,216,216)" wrapperBorderRadius="6px">
                              {/* TODO: Fix border, show only when there are results or errors */}
              { (data.length == 0 && query !== '') ? <NoResults resultSearchTerm={query}></NoResults> : <div>{renderSugg(this.state.data) }</div> }
            </WrapperContainer> : null
            }
           </MediaQuery> 


           {/* Mobile Responsive view */}
           <MediaQuery query="(max-width: 500px)">
            <div className="menuIcon">
              <div></div><div></div><div></div>
            </div>
            <Logo></Logo>
            <input id="searchBox" className="MobileSearchBox" onChange={ this.handleChange } 
                  placeholder="Search..." 
                  />
                  { loader ? <div className="MobileLoader"></div> : null }
              { this.state.showOuterWrapper ?
              <WrapperContainer className="suggestResults" wrapperPosition="absolute"
                                wrapperLeft="25px" wrapperTop="150px" wrapperMaxHeight="400px"
                                wrapperWidth="350px" wrapperHeight="auto" wrapperOverflow="auto"
                                wrapperBorder= "1px solid rgb(216,216,216)" wrapperBorderRadius="6px">
                                {/* TODO: Fix border, show only when there are results or errors */}
                { (data.length == 0 && query !== '') ? <NoResults resultSearchTerm={query}></NoResults> : <div>{renderSugg(this.state.data) }</div> }
              </WrapperContainer> : null
              }
           </MediaQuery>
      </WrapperContainer>
     
   
    </div>;
  }
}

export default App;