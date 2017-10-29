import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme'
import App from './App';


const wrap = (props = {}) => shallow(<App callApi={callApi} {...props} />)
const callApi = jest.fn()
const wrapStubCallApi = () => {
  const wrapper = wrap()
  wrapper.instance().callApi = callApi
  return wrapper
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('changing the search box will trigger a call to api', () =>{
  const wrapper = wrapStubCallApi()
  wrapper.find(".searchBox").simulate('change', { target: { value: 'text' }})
  expect(callApi).toBeCalled()
})

it('the loader is showing during a call to api', () =>{
  const wrapper = wrap()
  expect(wrapper.state().loader).toBe(false)
  wrapper.find(".searchBox").simulate('change', { target: { value: 'text' }})
  expect(wrapper.state().loader).toBe(true)
})