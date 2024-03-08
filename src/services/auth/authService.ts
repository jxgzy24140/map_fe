import http from "@/services/httpService";
import {
  IFirebaseLoginInputDto,
  IFirebaseRegisterInputDto,
  ILoginOutputDto,
  IRegisterOutputDto,
} from "@/services/auth/dto";
class AuthService {
  public async login(input: IFirebaseLoginInputDto): Promise<ILoginOutputDto> {
    const result = await http.post("auth/login", input);
    return result.data;
  }
  public async register(
    input: IFirebaseRegisterInputDto
  ): Promise<IRegisterOutputDto> {
    const result = await http.post("auth/register", input);
    return result.data;
  }
}

export default new AuthService();
