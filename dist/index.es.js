import Marionette from 'backbone.marionette';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Developer: Stepan Burguchev
 * Date: 2/5/2017
 * Copyright: 2015-2017 ApprovalMax
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ApprovalMax
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

var MarionetteComponent = function (_React$Component) {
    inherits(MarionetteComponent, _React$Component);

    function MarionetteComponent(props) {
        classCallCheck(this, MarionetteComponent);

        var _this = possibleConstructorReturn(this, (MarionetteComponent.__proto__ || Object.getPrototypeOf(MarionetteComponent)).call(this, props));

        _this._el = null;
        _this._view = null;
        _this._hostRegion = null;
        _this._regionManager = null;
        return _this;
    }

    createClass(MarionetteComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._regionManager = new Marionette.View();
            this._hostRegion = this._regionManager.addRegion('hostRegion', {
                el: this._el
            });
            this._rebuildView();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.view !== nextProps.view) {
                throw new Error('[MarionetteComponent] error: `props.view` cannot be changed after the initial render.');
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.onUpdateOptions) {
                this.props.onUpdateOptions(this._view, prevProps.viewOptions, this.props.viewOptions);
            }
            if (this._view.shouldViewRebuild && this._view.shouldViewRebuild(this.props.viewOptions)) {
                this._rebuildView();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._regionManager.destroy();
        }
    }, {
        key: 'getRegion',
        value: function getRegion() {
            return this._hostRegion;
        }
    }, {
        key: '_rebuildView',
        value: function _rebuildView() {
            if (!this.props.view) {
                return;
            }

            var View = this.props.view;
            this._view = new View(this.props.viewOptions);
            this._hostRegion.show(this._view);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement('div', { className: this.props.className, ref: function ref(el) {
                    return _this2._el = el;
                } });
        }
    }]);
    return MarionetteComponent;
}(React.Component);

MarionetteComponent.propTypes = {
    view: PropTypes.func.isRequired,
    viewOptions: PropTypes.object,
    onUpdateOptions: PropTypes.func,
    className: PropTypes.string
};

/**
 * Developer: Stepan Burguchev
 * Date: 2/5/2017
 * Copyright: 2015-2017 ApprovalMax
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ApprovalMax
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

var ReactBehavior = Marionette.Behavior.extend({
    initialize: function initialize(options) {
        if (!options.render) {
            throw new Error('Missing options: render');
        }
    },
    onRender: function onRender() {
        this._mountReactComponent();
    },
    onDestroy: function onDestroy() {
        if (this._mounted) {
            ReactDOM.unmountComponentAtNode(this._getContainerEl());
        }
    },
    _mountReactComponent: function _mountReactComponent() {
        ReactDOM.render(this.options.render(), this._getContainerEl());
        this._mounted = true;
    },
    _getContainerEl: function _getContainerEl() {
        if (this.options.containerEl) {
            return this.$(this.options.containerEl)[0];
        }
        return this.el;
    }
});

/**
 * Developer: Stepan Burguchev
 * Date: 2/5/2017
 * Copyright: 2015-2017 ApprovalMax
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ApprovalMax
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

var ReactView = Marionette.View.extend({
    initialize: function initialize(options) {},


    template: false,

    behaviors: function behaviors() {
        return {
            ReactBehavior: {
                behaviorClass: ReactBehavior,
                containerEl: null,
                render: this.options.render
            }
        };
    }
});

export { MarionetteComponent, ReactBehavior, ReactView };
//# sourceMappingURL=index.es.js.map
