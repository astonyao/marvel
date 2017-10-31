import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MediaQuery from 'react-responsive'
import NoResults from './components/NoResults.js'
import Logo from './components/Logo.js'
import Avatar from './components/Avatar.js'
import CharacterInfo from './components/CharacterInfo.js'
import WrapperContainer from './components/WrapperContainer.js'

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
      loader: false,
      userTyping: false
    };
  }

  /* Event handler when the user inputs */
  handleChange = (event) => {
    this.state.inputValue = event.target.value
    var query = this.state.inputValue
    this.state.userTyping = true
    if(this.state.query !== ''){
      this.setState({
        previousQuery: query
      })
    }

    var emptyQuery = ""
    /* Dynamic search result suggestion base on keystroke */
    if(this.state.timeout != null){
        clearTimeout(this.state.timeout)
          this.setState({
            ...this.state,
            emptyQuery,
            query: emptyQuery,
            data: [],
            loader: false,
            userTyping: true
          })
    }

    this.state.timeout = setTimeout(() => {
      query = this.state.inputValue
      this.setState({
        ...this.state,
        previousQuery: query,
        loader: true
      })

      /* Prevent sudden change of input field: eg. Select all and delete */
      if(this.state.inputValue === ''){
        this.setState({
          query: this.state.previousQuery,
          showOuterWrapper: false
        })
      }
      this.setState({
        previousQuery: query,
        userTyping: false
      })

      /* Send request to API server */
      this.callApi(query)
  
    }, 500);
  }

  callApi = (query) => {
    //TODO manage errors
    this.state.timeout = setTimeout(() => {
      axios.get(`http://localhost:1111/characters?nameStartsWith=${query}`)
      .then((response) => {
        if(this.state.inputValue===''){
          this.setState({
            showOuterWrapper: false,
            userTyping: false
          })
        }else{
          this.setState({
            showOuterWrapper: true,
            userTyping: false
          })
        }
        this.setState({
          ...this.state,
          query,
          data: (response.data.results || []),
          loader: false,
          userTyping: false
        })
      });
    }, 500);
  }
  
  render() {
    /* Individual result container  */
    const renderSugg = (data) => (data.map((el, index) => (
        <div key={index}>
          <WrapperContainer 
              wrapperHoverable = 'true' wrapperClickable = 'true' wrapperData = { el.name }
              wrapperWidth="auto" wrapperHeight="80px" wrapperPosition="relative" 
              wrapperBorder="1px solid rgb(216,216,216)" wrapperBgcolor="rgb(250,250,250)">
            <Avatar imgSrc={ el.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? "https://cdn.browshot.com/static/images/not-found" : el.thumbnail.path } 
                    imgExt={ el.thumbnail.extension } altText= { el.name } ></Avatar>
            <CharacterInfo infoName={ el.name } infoDescription={ el.description }></CharacterInfo>
          </WrapperContainer>
      </div>
    )))
    const { data, query, loader, userTyping, showOuterWrapper } = this.state
    return <div>
      <WrapperContainer wrapperWidth="100%" wrapperHeight="80px" wrapperBgcolor="rgb(229,37,47)" wrapperPosition="relative" >
          {/* Desktop View */}
          <MediaQuery query="(min-width: 500px)">
          <Logo></Logo>
          <input id="searchBox" className="searchBox" onChange={ this.handleChange } placeholder="Search..." />
            { loader ? <div className="loader"></div> : null }

            {/* Container for all results */}
            { (showOuterWrapper && !userTyping) ?
            <WrapperContainer className="suggestResults" wrapperPosition="absolute"
                              wrapperRight="22%" wrapperTop="60px" wrapperMaxHeight="400px"
                              wrapperWidth="350px" wrapperHeight="auto" wrapperOverflow="auto"
                              wrapperBorderRadius="6px">
              { (data.length === 0 && query !== '') ? <NoResults resultSearchTerm={query}></NoResults> : <div>{renderSugg(this.state.data) }</div> }
            </WrapperContainer> : null
            }
           </MediaQuery> 


           {/* Mobile Responsive view */}
           <MediaQuery query="(max-width: 500px)">
            <div className="menuIcon">
              <div></div><div></div><div></div>
            </div>
            <Logo></Logo>
            <input id="searchBox" className="MobileSearchBox" onChange={ this.handleChange } placeholder="Search..." />
              { loader ? <div className="MobileLoader"></div> : null }
              { (showOuterWrapper && !userTyping) ?
              <WrapperContainer className="suggestResults" wrapperPosition="absolute"
                                wrapperLeft="25px" wrapperTop="150px" wrapperMaxHeight="400px"
                                wrapperWidth="350px" wrapperHeight="auto" wrapperOverflow="auto"
                                wrapperBorderRadius="6px">
                { (data.length === 0 && query !== '') ? <NoResults resultSearchTerm={query}></NoResults> : <div>{renderSugg(this.state.data) }</div> }
              </WrapperContainer> : null
              }
           </MediaQuery>
      </WrapperContainer>
    </div>;
  }
}

export default App;