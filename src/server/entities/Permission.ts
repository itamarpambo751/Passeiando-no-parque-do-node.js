type PermissionModelParametersType = { id?: string, name: string };

export class PermissionModel {

    public readonly id?: string;
    public name: string = '';

    constructor(parameters: PermissionModelParametersType) {
        Object.assign(this, parameters);
    };
};