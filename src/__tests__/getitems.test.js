import React from 'react';
import { shallow, mount, render } from 'enzyme';
import GetItems from '../components/items/getitems.js';

jest.mock('react-notifications');
import {baseURL} from '../config.js';
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock items POST request
mock.onPost(`${baseURL}/shoppinglists/1/items`).reply(200, {
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};



describe('GetItems ', () => {
  const props = {
        history:{
            push: () =>{}
        }
    }
    const wrapper = mount(<GetItems/>);

    it('should render <GetItems /> component', () => {
        const wrapper = shallow(<GetItems />)
        expect(wrapper.length).toEqual(1)
    });
    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(7)
    })
    // it('should render form correctly', () => {
    //
    //     const ListForm = wrapper.find("Modal");
    //     expect(ListForm.children()).toHaveLength(1);
    // });

    // it('should render form inputs', () => {
    //     expect(wrapper.find('#name').length).toEqual(1);
    //     expect(wrapper.find('#desc').length).toEqual(1);
    // });
    // it('input should respond to change event and change the state', () => {
    //       wrapper.find('#item').simulate('change', { target: { name: 'name', value: 'cake' } });
    //       expect(wrapper.state('Item')).toEqual('cake')
    //   });





});
