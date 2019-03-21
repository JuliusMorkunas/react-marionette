# react-marionette [![npm](https://img.shields.io/npm/v/react-marionette.svg?style=flat-square)](https://www.npmjs.com/package/react-marionette) [![Travis](https://img.shields.io/travis/xsburg/react-marionette.svg?style=flat-square)](https://travis-ci.org/xsburg/react-marionette) [![Coveralls](https://img.shields.io/coveralls/xsburg/react-marionette.svg?style=flat-square)](https://coveralls.io/github/xsburg/react-marionette)

Connects your [Marionette](https://marionettejs.com/) views and [React](https://reactjs.org/) components.

The library provides a bidirectional gateway between the two technologies:

1. `ReactView` and `ReactBehavior` - renders React components inside your Marionette views.
2. `MarionetteComponent` - renders Marionette views inside your React components.

## Installation

The react-marionette library is provided as an [NPM package](https://www.npmjs.com/package/react-marionette):

```
$ npm install --save react-marionette
```

## ReactView

```javascript
const view = new ReactView({
    className: 'react-wrapper',
    render: () => <div className="react-component">Hello, React</div>
});
someRegion.show(view);

/*
Result:
<div class="react-wrapper">
    <div class="react-component">
        Hello, React
    </div>
</div>
*/
```
[![Edit y3l43yko6z](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/y3l43yko6z)

The simplest way to render React components in your Marionette layout. Inside, creates a new mount point using `ReactDOM.render` and unmounts on view destroy.

`render` - a function that returns a React node.

A more complicated example using Redux for state management and rendering a connected component:

```javascript
const view = new ReactView({
    className: 'react-wrapper',
    render: () => {
        return (
            <Provider store={store}>
                <SomeConnectedComponent />
            </Provider>
        );
    }
});
someRegion.show(view);
```

## ReactBehavior

```javascript
const View = Marionette.View.extend({
    template: false,
    className: 'marionette-root',
    behaviors() {
        return {
            ReactBehavior: {
                behaviorClass: ReactBehavior,
                containerEl: null,
                render: () => <div className="react-component">Hello, React!</div>,
            }
        };
    }
});

/*
Result:
<div class="react-wrapper">
    <div class="react-component">
        Hello, React
    </div>
</div>
*/
```
[![Edit 5x89o51wr4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5x89o51wr4)

This behavior gives you more flexibility when rendering a React node by providing the `containerEl` option. Apart from this, the underlying render logic is the same as in `ReactView`.

`render` - a function that returns a React node.

`containerEl` - a jQuery selector that identifies the element that should be used to render the react node. Similarly to the `ui` selectors in `Marionette.View`, this selector is scoped to the view which this behavior is applied to.

## MarionetteComponent

```javascript
const SimpleView = Marionette.View.extend({
    template({ name }) {
        return `Hello, ${name}`;
    },
    templateContext() {
        return {
            name: this.options.name
        };
    },
    className: 'simple-view'
});
export const SomeStatelessComponent = () => {
    return (
        <div className="react-block">
            <MarionetteComponent
                className="marionette-wrapper"
                view={SimpleView}
                viewOptions={{
                    name: 'Marionette'
                }}
            />
        </div>);
};

/*
Result:
<div class="react-block">
    <div class="marionette-wrapper">
        <div class="simple-view">
            Hello, Marionette
        </div>
    </div>
</div>
*/
```

[![Edit 5v34zm4qn4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5v34zm4qn4)

A reverse gateway allowing to render a Marionette view inside your React code. Once rendered, the marionette view is not updated on `viewOptions` change unless it is defined in `onUpdateOptions`.

`view` - a Marionette.View class to be rendered.

`viewOptions` - options to be passed to the view when it is constructed.

`className` - a class that can be optionally set to the wrapper `div` element of `MarionetteComponent`.

`onUpdateOptions(view, viewOptions, nextViewOptions)` - a callback which is called when the view options change. Allows to manually update the view on options change:

```javascript
onUpdateOptions(view, viewOptions, nextViewOptions) {
    if (viewOptions.name !== nextViewOptions.name) {
        view.options = nextViewOptions;
        view.render();
    }
}
```

Alternatively, `shouldViewRebuild` can be implemented inside the View to handle it's update requests:

```javascript
const SimpleView = Marionette.View.extend({
    template({ name }) {
        return `Hello, ${name}`;
    },
    templateContext() {
        return {
            name: this.options.name
        };
    },
    className: 'sample-view',
    shouldViewRebuild(nextOptions) {
        // Or just implement the update logic here and return false
        return true;
    }
});
```
