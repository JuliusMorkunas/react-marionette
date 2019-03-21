import React from 'react';
import Marionette from 'backbone.marionette';
import { ReactView } from '../src/index';

describe('ReactView', () => {
    it('should render react component', () => {
        const RegionView = Marionette.View.extend({
            regions: {}
        });
        const regionView = new RegionView();
        const region = regionView.addRegion('hostRegion', {
            el: document.createElement('div')
        });
        const view = new ReactView({
            className: 'react-wrapper',
            render: () => <div className="react-component">Hello, React</div>,
        });
        region.show(view);
        const html = view.el.outerHTML;

        expect(html).toMatchSnapshot();
    });

    it('should render react component on render', () => {
        const view = new ReactView({
            className: 'react-wrapper',
            render: () => <div className="react-component">Hello, React</div>,
        });
        view.render();
        const html = view.el.outerHTML;

        expect(html).toMatchSnapshot();
    });
});
