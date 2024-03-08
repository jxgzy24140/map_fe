export interface IUserDto {
  id: string;
  userName?: string;
  email?: string;
  phoneNumber: string;
}

export interface ILoginOutputDto {
  success: boolean;
  message: string;
  accessToken?: string;
  user?: IUserDto;
}
