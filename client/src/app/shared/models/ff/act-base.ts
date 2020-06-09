export class ActBase<T> {
    value: T;
    key: string;
    label: string;
    controlType: string;
    order: number;
    visible: boolean;
    required: boolean;
    nestedGroup: boolean;
    nestedArray: boolean;
    populate: boolean;
    editable: boolean;
    deletable: boolean;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        controlType?: string,
        order?: number,
        visible?: boolean,
        required?: boolean,
        nestedGroup?: boolean,
        nestedArray?: boolean,
        populate?: boolean,
        editable?: boolean,
        deletable?: boolean
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.controlType = options.controlType || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.visible = !!options.visible;
        this.nestedGroup = !!options.nestedGroup || false;
        this.nestedArray = !!options.nestedArray || false;
        this.populate = options.populate || false;
        this.editable = options.editable || false;
        this.deletable = options.deletable || false;
    }
}