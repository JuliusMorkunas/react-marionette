import React from 'react';
import Marionette from 'backbone.marionette';
import { mount } from 'enzyme';
import { ReactBehavior } from '../src/index';

describe('ReactBehavior', () => {
    it('should render react component under the root element', () => {
        const View = Marionette.View.extend({
            template: false,
            className: 'marionette-root',
            behaviors() {
                return {
                    ReactBehavior: {
                        behaviorClass: ReactBehavior,
                        containerEl: null,
                        render: () => <div className="react-component">Hello, React!</div>,
                        mountPoint: 'onRender'
                    }
                };
            }
        });
        const view = new View();
        view.render();
        const html = view.el.outerHTML;

        expect(html).toMatchSnapshot();
    });

    it('should render react component under the container element', () => {
        const View = Marionette.View.extend({
            template() {
                return '<div class="container-el"></div>';
            },
            className: 'marionette-root',
            behaviors() {
                return {
                    ReactBehavior: {
                        behaviorClass: ReactBehavior,
                        containerEl: '.container-el',
                        render: () => <div className="react-component">Hello, React!</div>,
                        mountPoint: 'onRender'
                    }
                };
            }
        });
        const view = new View();
        view.render();
        const html = view.el.outerHTML;

        expect(html).toMatchSnapshot();
    });
});
