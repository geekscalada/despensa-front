type IAccessToken = string;
type IRefreshToken = string;

export interface ResponseLogin {
  accessToken: IAccessToken;
  refreshToken: IRefreshToken;
}
