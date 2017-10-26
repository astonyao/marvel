import React, { Component } from 'react';
import s from './App.css';
import axios from 'axios';
import Logo from './components/logo'
import Avatar from './components/avatar'
import CharacterInfo from './components/characterInfo'
import WrapperContainer from './components/wrapperContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      q: '',
      data: [],
      loader: false
    };
    this.onChange = (event) => {
      const q = event.target.value
      this.setState({
        ...this.state,
        loader: true
      })
      //TODO manage errors
      axios.get(`http://localhost:1111/characters?nameStartsWith=${q}`)
      .then((response) => {
        // console.log(response);
        this.setState({
          ...this.state,
          q,
          data: (response.data.results || []),
          loader: false
        })
      });
    }
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
    const { data, q, loader } = this.state
    return <div className={s.test}>
      <WrapperContainer wrapperWidth="100%" wrapperHeight="100px" wrapperBgcolor="red">
          <Logo></Logo>
          <input onChange={this.onChange} placeholder="Search..." />
          { loader ? <span> loading </span> : null }
          <WrapperContainer wrapperWidth="35%" wrapperHeight="400px" wrapperOverflow="auto">
            { (data.length == 0 && q !== '') ? <span> Oups </span> : <div>{renderSugg(this.state.data) }</div> }
            </WrapperContainer>
      </WrapperContainer>
     
   
    </div>;
  }
}

export default App;
