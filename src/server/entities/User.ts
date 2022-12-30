type UserModelParametersType = { id?: string, name: string, email: string, password: string };

export class UserModel {

    public readonly id?: string;
    public name: string = '';
    public email: string = '';
    public password: string = '';

    constructor(parameters: UserModelParametersType) {
        Object.assign(this, parameters);
    };
};