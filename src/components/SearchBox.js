// import React, { Component } from 'react';
// import axios from 'axios';

// class SearchBox extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             count: '',
//             q: '',
//             data: [],
//             loader: false
//           };

//         this.onChange = (event) => {
//             const q = event.target.value
//             this.setState({
//               ...this.state,
//               loader: true
//             })
//             //TODO manage errors
//             axios.get(`http://localhost:1111/characters?nameStartsWith=${q}`)
//             .then((response) => {
//               console.log(response);
//               this.setState({
//                 ...this.state,
//                 q,
//                 data: (response.data.results || []),
//                 loader: false
//               })
//             });
//           }
//     }
    

//     componentDidMount(){
//         console.log("SearchBox mounted " + this.state.loader);
//     }

//     render() {
//         var searchBoxStyle = {

//         }
        
//         return <div style = { searchBoxStyle }>
//         <input onChange={this.onChange} placeholder="Search..." />
//           { loader ? <span> loading </span> : null }
//         </div>;
//       }
// }

// export default SearchBox;