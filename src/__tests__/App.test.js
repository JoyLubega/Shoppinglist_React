import React from 'react';
import App from '../App';
import { shallow} from 'enzyme';

test('renders the app component', () => {
  const wrapper = shallow(
    <App />
  );
  expect(wrapper).toMatchSnapshot();
});
