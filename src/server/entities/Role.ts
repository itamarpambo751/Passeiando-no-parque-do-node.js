type RoleModelParametersType = { id?: string, name: string };

export class UserModel {

    public readonly id?: string;
    public name: string = '';

    constructor(parameters: RoleModelParametersType) {
        Object.assign(this, parameters);
    };
};