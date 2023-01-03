type PermitionModelParametersType = { id?: string, name: string };

export class PermitionModel {

    public readonly id?: string;
    public name: string = '';

    constructor(parameters: PermitionModelParametersType) {
        Object.assign(this, parameters);
    };
};