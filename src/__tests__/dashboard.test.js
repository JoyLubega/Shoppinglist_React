import React from 'react';
import { shallow, render } from 'enzyme';
import Dashboard from '../dashboard.js';
import GetShoppinglist from '../components/shoppinglists/getshoppinglists.js';
import AddShoppinglist from '../components/shoppinglists/addshoppinglists.js';



describe("<Dashboard /> component", () => {
    const props = {
        history:{
            push: () => {}
        }
    }

    it('should render <Dashboard /> component', () => {
        const wrapper = shallow(<Dashboard />)
        expect(wrapper.length).toEqual(1)
    });
    const wrapper = shallow(<Dashboard />);
    it("should render without failing", () => {
        expect(wrapper.find("div")).toHaveLength(3)

    });
    it('should render <nav/> correctly', ()=> {
        expect(wrapper.exists(<nav className="black" />)).toBe(true)
    })
});

describe('<Dashboard /> component contains child componenets', () => {


    it('should render <GetShoppinglist /> component', () => {
        const wrapper = shallow(<GetShoppinglist />)
        expect(wrapper.length).toEqual(1)
    });




});
