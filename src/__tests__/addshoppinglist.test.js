import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AddShoppinglist from '../components/shoppinglists/addshoppinglists.js';

jest.mock('react-notifications');
import {baseURL} from '../config.js';
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock buckets POST request to /buckets
mock.onPost(`${baseURL}/shoppinglists`).reply(200, {
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};



describe('<AddShoppinglist /> component', () => {
    const wrapper = shallow(<AddShoppinglist />)
    const addlistMock = jest.fn();
    const addlistComponent = mount(<AddShoppinglist addlist={addlistMock} />);
    const addlistButton = addlistComponent.find('[type="submit"]');

    it('should render <AddShoppinglist /> component', () => {
        const wrapper = shallow(<AddShoppinglist />)
        expect(wrapper.length).toEqual(1)
        expect(wrapper).toMatchSnapshot();

    });

    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(8)
    })
    it('should render form correctly', () => {

        const ListForm = wrapper.find("form");
        expect(ListForm).toHaveLength(1);
    });

    it('should render form inputs', () => {
        expect(wrapper.find('#name').length).toEqual(1);
        expect(wrapper.find('#desc').length).toEqual(1);
    });
    it('input should respond to change event and change the state', () => {
          wrapper.find('#name').simulate('change', { target: { name: 'name', value: 'Birthday' } });
          expect(wrapper.state('name')).toEqual('Birthday')
      });





});
