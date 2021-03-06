import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {GetShoppinglist}  from '../components/shoppinglists/getshoppinglists.js';
import AddShoppinglist from '../components/shoppinglists/addshoppinglists.js';
import sinon from 'sinon';
jest.mock('react-notifications');
import {baseURL} from '../config.js';
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock items POST request
mock.onPost(`${baseURL}/shoppinglists/`).reply(200, {
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};



describe('GetShoppinglist ', () => {
  const props = {
        history:{
            push: () =>{}
        }
    }
    const wrapper = shallow(<GetShoppinglist />);
    it('should render <GetShoppinglist /> component', () => {
        const wrapper = shallow(<GetShoppinglist />)
        expect(wrapper.length).toEqual(1)
    });
    // it checks if the component mounts.
    it('calls componentWillMount', () => {
    sinon.spy(GetShoppinglist.prototype, 'componentWillMount');
    const wrapper = mount(<GetShoppinglist />);
    expect(GetShoppinglist.prototype.componentWillMount.calledOnce).toBe(true);
  })
  

    it('should render without throwing an error', () => {
      const wrapper = mount(<GetShoppinglist />);
        expect(wrapper.find("div")).toHaveLength(10);
    })



    it('should render Modal correctly', () => {
        const wrapper = mount(<GetShoppinglist />);
        const texts = wrapper.find('Modal').map(node => node.text());
        expect(texts).toHaveLength(1);
    });






});






// Chridren components
describe('<GetShoppinglist /> component contains child componenets', () => {

    it('should render <AddShoppinglist /> component', () => {
        const wrapper = shallow(<AddShoppinglist />)
        expect(wrapper.length).toEqual(1)
    });



});
