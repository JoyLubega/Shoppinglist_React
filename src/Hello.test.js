import React from 'react';
import { mount,shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import Login from './components/authentication/login.js';
import renderer from 'react-test-renderer';

const baseURL = "http://127.0.0.1:5000";
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock Login POST request to /login
mock.onPost(`${baseURL}/auth/login`).reply(200, {
  users: [
    { status: 'success', token: 1 },
  ],
});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

describe('Component: Login', () => {
  const wrapper = shallow(<Login />)
  const routerComponent = mount(
    <StaticRouter location="login" context={{}}>
      <Login />
    </StaticRouter>,
  );
  const loginComponent = routerComponent.find('Login');
  const emailInput = loginComponent.find('#email');
  const passwordInput = loginComponent.find('#password');

  it('Displays Login', () => {
    const rendered = renderer.create(
      <StaticRouter location="login" context={{}}>
        <Login />
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
            expect(wrapper.find('#email').length).toEqual(1);
            expect(wrapper.find('#password').length).toEqual(1);
    });


    it('input should respond to change event and change the state', () => {
          wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'admin@gmail.com' } });
          expect(wrapper.state('email')).toEqual('admin@gmail.com')
      });

  it('signs in user', () => {
    const loginButton = loginComponent.find('[type="submit"]');
    loginButton.simulate('submit');
  });
});
