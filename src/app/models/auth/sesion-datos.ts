import { UserModel } from "../security/User.model";

export class SessionData {
    token?: string;
    usuario?: UserModel;
    isLoggedIn: boolean = false;
}