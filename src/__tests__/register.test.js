import React from 'react';
import { mount,shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import Register from '../components/authentication/register.js';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import sinon from 'sinon';

const baseURL = "http://127.0.0.1:5000";
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock Login POST request to /login
mock.onPost(`${baseURL}/auth/register`).reply(200, {
  users: [
    { status: 'success', token: 1 },
  ],
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

describe('Component: Register', () => {
  const wrapper = shallow(<Register />)
  const routerComponent = mount(
    <StaticRouter location="register" context={{}}>
      <Register/>
    </StaticRouter>,
  );
  const RegisterComponent = routerComponent.find('Register');
  const nameInput = RegisterComponent.find('#name');
  const emailInput = RegisterComponent.find('#email');
  const passwordInput = RegisterComponent.find('#password');

  it('Displays Register', () => {
    const rendered = renderer.create(
      <StaticRouter location="register" context={{}}>
        <Register />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('should render form correctly', () => {
        // check register component contain one <from/>
        const LoginForm = wrapper.find("form");
        expect(LoginForm).toHaveLength(1);

});

    it('should render form inputs', () => {
            expect(wrapper.find('#name').length).toEqual(1);
            expect(wrapper.find('#email').length).toEqual(1);
            expect(wrapper.find('#password').length).toEqual(1);
    });


    it('input should respond to change event and change the state', () => {
          wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'admin@gmail.com' } });
          expect(wrapper.state('email')).toEqual('admin@gmail.com')
      });

  it('Registers a user', () => {
    const registerButton = RegisterComponent.find('[type="submit"]');
    registerButton.simulate('submit');
  });
});
