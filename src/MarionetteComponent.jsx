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
import PropTypes from 'prop-types';

class MarionetteComponent extends React.Component {
    constructor(props) {
        super(props);
        this._el = null;
        this._view = null;
        this._hostRegion = null;
        this._regionManager = null;
    }

    componentDidMount() {
        this._regionManager = new Marionette.RegionManager();
        this._hostRegion = this._regionManager.addRegion('hostRegion', {
            el: this._el
        });
        this._rebuildView(this.props);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.onUpdateOptions) {
            nextProps.onUpdateOptions(this._view);
        }
        if (this._view.shouldViewRebuild && this._view.shouldViewRebuild(nextProps.viewOptions)) {
            this._rebuildView(nextProps);
        }
        return false;
    }

    componentWillUnmount() {
        this._regionManager.destroy();
    }

    getRegion() {
        return this._hostRegion;
    }

    _rebuildView(props) {
        if (!props.view) {
            return;
        }

        const View = props.view; // tslint:disable-line
        this._view = new View(props.viewOptions);
        this._hostRegion.show(this._view);
    }

    render() {
        return <div className={this.props.className} ref={el => (this._el = el)} />;
    }
}

MarionetteComponent.propTypes = {
    view: PropTypes.func.isRequired,
    viewOptions: PropTypes.object,
    onUpdateOptions: PropTypes.func,
    className: PropTypes.string
};

export default MarionetteComponent;