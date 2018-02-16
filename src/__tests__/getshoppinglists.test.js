import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {GetShoppinglist}  from '../components/shoppinglists/getshoppinglists.js';
import AddShoppinglist from '../components/shoppinglists/addshoppinglists.js';
import sinon from 'sinon';
jest.mock('react-notifications');
const baseURL = "http://127.0.0.1:5000";
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
        // console.log(wrapper.props().children);
        expect(wrapper.length).toEqual(1)
    });
    it('calls componentWillMount', () => {
    sinon.spy(GetShoppinglist.prototype, 'componentWillMount');
    const wrapper = mount(<GetShoppinglist />);
    expect(GetShoppinglist.prototype.componentWillMount.calledOnce).toBe(true);
  })

    it('should render without throwing an error', () => {
      const wrapper = mount(<GetShoppinglist />);

        expect(wrapper.find("div")).toHaveLength(7);
    })
    // it('should render form correctly', () => {
    //
    //     const ListForm = wrapper.find("form");
    //     expect(ListForm).toHaveLength(0);
    // });

    // it('should render form inputs', () => {
    //     expect(wrapper.find('#name').length).toEqual(1);
    //     expect(wrapper.find('#desc').length).toEqual(1);
    // });
    // it('input should respond to change event and change the state', () => {
    //       wrapper.find('#item').simulate('change', { target: { name: 'item', value: 'cake' } });
    //       expect(wrapper.state('item')).toEqual('Birthday')
    //   });





});







describe('<GetShoppinglist /> component contains child componenets', () => {

    it('should render <AddShoppinglist /> component', () => {
        const wrapper = shallow(<AddShoppinglist />)
        expect(wrapper.length).toEqual(1)
    });



});
