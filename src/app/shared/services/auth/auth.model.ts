export interface LoginData {
    email: string;
    password: string;
}
export interface SignUpData {
    email: string;
    fullName: string;
    password: string;
}

export class User {
    constructor(public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date) {
    }
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return "";
        }
        return this._token;
    }
}