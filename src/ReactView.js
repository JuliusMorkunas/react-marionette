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
import ReactBehavior from './ReactBehavior';

export default Marionette.View.extend({
    initialize(options) {},

    template: false,

    behaviors() {
        return {
            ReactBehavior: {
                behaviorClass: ReactBehavior,
                containerEl: null,
                render: this.options.render,
            }
        };
    }
});
