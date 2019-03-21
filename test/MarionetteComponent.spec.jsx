import React from 'react';
import Marionette from 'backbone.marionette';
import { mount } from 'enzyme';
import { MarionetteComponent } from '../src/index';

const SimpleView = Marionette.View.extend({
    template({ name }) {
        return `Hello, ${name}`;
    },
    templateContext() {
        return {
            name: this.options.name
        };
    },
    className: 'sample-view'
});

describe('MarionetteComponent', () => {
    it('should render simple marionette view', () => {
        const component = mount(
            <div className="react-block">
                <MarionetteComponent
                    className="marionette-wrapper"
                    view={SimpleView}
                    viewOptions={{
                        name: 'Marionette'
                    }}
                />
            </div>
        );
        const marionetteElementHtml = component
            .getDOMNode()
            .getElementsByClassName('marionette-wrapper')[0].innerHTML;

        expect(component).toMatchSnapshot();
        expect(marionetteElementHtml).toMatchSnapshot();
    });

    it('should not update view when options change (w/o update checkers)', () => {
        const component = mount(
            <MarionetteComponent
                className="marionette-wrapper"
                view={SimpleView}
                viewOptions={{
                    name: 'Marionette'
                }}
            />
        );
        component.setProps({
            viewOptions: {
                name: 'Billy'
            }
        });
        const marionetteElementHtml = component.getDOMNode().innerHTML;

        expect(marionetteElementHtml).toMatchSnapshot();
    });

    it('should update view when options change (w/ onUpdateOptions)', () => {
        const component = mount(
            <MarionetteComponent
                className="marionette-wrapper"
                view={SimpleView}
                viewOptions={{
                    name: 'Marionette'
                }}
                onUpdateOptions={(view, options, nextOptions) => {
                    view.options = nextOptions;
                    view.render();
                }}
            />
        );
        component.setProps({
            viewOptions: {
                name: 'Billy'
            }
        });
        const marionetteElementHtml = component.getDOMNode().innerHTML;

        expect(marionetteElementHtml).toMatchSnapshot();
    });

    it('should update view when options change (w/ shouldViewRebuild that returns true)', () => {
        const SimpleViewWithRebuild = SimpleView.extend({
            shouldViewRebuild(newOptions) {
                return true;
            }
        });

        const component = mount(
            <MarionetteComponent
                className="marionette-wrapper"
                view={SimpleViewWithRebuild}
                viewOptions={{
                    name: 'Marionette'
                }}
            />
        );
        component.setProps({
            viewOptions: {
                name: 'Billy'
            }
        });
        const marionetteElementHtml = component.getDOMNode().innerHTML;

        expect(marionetteElementHtml).toMatchSnapshot();
    });

    it('should update view when options change (w/ shouldViewRebuild that does the update itself)', () => {
        const SimpleViewWithRebuild = SimpleView.extend({
            shouldViewRebuild(newOptions) {
                this.options = newOptions;
                this.render();
                return false;
            }
        });

        const component = mount(
            <MarionetteComponent
                className="marionette-wrapper"
                view={SimpleViewWithRebuild}
                viewOptions={{
                    name: 'Marionette'
                }}
            />
        );
        component.setProps({
            viewOptions: {
                name: 'Billy'
            }
        });
        const marionetteElementHtml = component.getDOMNode().innerHTML;

        expect(marionetteElementHtml).toMatchSnapshot();
    });
});
