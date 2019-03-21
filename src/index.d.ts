import * as React from 'react';
//import * as Marionette from 'backbone.marionette';

type MarionetteView = any;
type MarionetteViewClass = any;

interface OwnProps {
    view: MarionetteViewClass;
    viewOptions: any;
    onUpdateOptions?: (view: MarionetteView, viewOptions: any, nextViewOptions: any) => boolean;
    className?: string;
}

export class MarionetteComponent extends React.Component<OwnProps> {
}

export class ReactBehavior {
}

export class ReactView {
    constructor(options?: {
        attributes?: any[];
        className?: string;
        el?: any;
        tagName?: string;
        render: () => React.ReactNode,
    });
}
