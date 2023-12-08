import { UserModel } from "./user.model";

export class LoginResponseModel {
  tokenType!: string;
  accessToken!: string;
  user!: UserModel;
}
