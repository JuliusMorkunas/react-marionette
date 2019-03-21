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

import Marionette from 'backbone.marionette';
import React from 'react';
import ReactDOM from 'react-dom';

export default Marionette.Behavior.extend({
    initialize(options) {
        if (!options.render) {
            throw new Error('Missing options: render');
        }
    },

    onRender() {
        this._mountReactComponent();
    },

    onDestroy() {
        if (this._mounted) {
            ReactDOM.unmountComponentAtNode(this._getContainerEl());
        }
    },

    _mountReactComponent() {
        ReactDOM.render(
            this.options.render(),
            this._getContainerEl()
        );
        this._mounted = true;
    },

    _getContainerEl() {
        if (this.options.containerEl) {
            return this.$(this.options.containerEl)[0];
        }
        return this.el;
    }
});
